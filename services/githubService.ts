import { GitHubFile, ParsedPost, PostMetadata } from '../types';

const USERNAME = 'uug4na';
const REPO = 'blogs';

export const fetchPostList = async (): Promise<GitHubFile[]> => {
  try {
    const response = await fetch(`https://api.github.com/repos/${USERNAME}/${REPO}/contents`);
    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.statusText}`);
    }
    const data: GitHubFile[] = await response.json();
    // Filter for markdown files only
    return data.filter(file => file.name.endsWith('.md'));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
};

export const fetchPostContent = async (downloadUrl: string): Promise<ParsedPost> => {
  try {
    const response = await fetch(downloadUrl);
    if (!response.ok) {
      throw new Error("Failed to download post content");
    }
    const rawText = await response.text();
    return parseMarkdown(rawText);
  } catch (error) {
    console.error("Failed to fetch content:", error);
    return {
      content: "# Error Loading Post\nCould not load content.",
      metadata: {},
      readingTime: 0
    };
  }
};

// Parse Frontmatter (simple regex based)
const parseMarkdown = (text: string): ParsedPost => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = text.match(frontmatterRegex);
  
  let metadata: PostMetadata = {};
  let content = text;

  if (match) {
    const frontmatterBlock = match[1];
    content = text.replace(match[0], ''); // Remove frontmatter from content
    
    // Simple key: value parser
    frontmatterBlock.split('\n').forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join(':').trim().replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
        
        if (key === 'tags') {
            // Very basic array parsing for tags: [a, b]
            const cleanValue = value.replace(/[\[\]]/g, '');
            metadata[key] = cleanValue.split(',').map(t => t.trim());
        } else {
            // @ts-ignore - dynamic assignment
            metadata[key] = value;
        }
      }
    });
  }

  // Calculate reading time
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);

  return {
    metadata,
    content,
    readingTime
  };
};

export const formatTitle = (filename: string): string => {
  return filename.replace('.md', '').split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};