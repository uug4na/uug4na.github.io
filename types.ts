export interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

export interface PostMetadata {
  title?: string;
  date?: string;
  author?: string;
  tags?: string[];
  description?: string;
}

export interface ParsedPost {
  metadata: PostMetadata;
  content: string;
  readingTime: number; // in minutes
}

export interface GitHubError {
  message: string;
  documentation_url: string;
}