import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { fetchPostList, fetchPostContent, formatTitle } from '../services/githubService';
import { Loader2, ArrowLeft, Calendar, Clock, Share2, User } from 'lucide-react';
import ComicButton from './ComicButton';
import { ParsedPost } from '../types';

const PostView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [postData, setPostData] = useState<ParsedPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        // We first need to find the file URL.
        const files = await fetchPostList();
        const file = files.find(f => f.name === slug);
        
        if (file) {
          const data = await fetchPostContent(file.download_url);
          setPostData(data);
        } else {
          setError("Story not found in the archives!");
        }
      } catch (err) {
        setError("Failed to decipher the ancient scrolls.");
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: postData?.metadata.title || formatTitle(slug || ''),
          text: 'Check out this post!',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-16 h-16 animate-spin text-comic-purple dark:text-comic-yellow" />
        <p className="font-display text-2xl mt-4 dark:text-white">Decoding Message...</p>
      </div>
    );
  }

  if (error || !postData) {
    return (
      <div className="text-center py-20">
        <h2 className="font-display text-4xl text-comic-red mb-4">Gadzooks!</h2>
        <p className="text-xl mb-8 dark:text-gray-300">{error}</p>
        <Link to="/">
          <ComicButton label="Back to Safety" />
        </Link>
      </div>
    );
  }

  // Use metadata title if available, else format filename
  const displayTitle = postData.metadata.title || formatTitle(slug || '');
  const displayDate = postData.metadata.date || new Date().toLocaleDateString();

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
        {/* Navigation Bar */}
        <div className="mb-8 flex justify-between items-center border-b-4 border-black dark:border-gray-600 pb-4">
            <Link to="/">
                <button className="flex items-center gap-2 font-display text-xl hover:text-comic-red transition-colors dark:text-white">
                    <ArrowLeft size={24} /> Back to Issues
                </button>
            </Link>
            <button 
                onClick={handleShare}
                className="flex items-center gap-2 font-display text-lg bg-comic-yellow text-black px-4 py-1 border-2 border-black hover:bg-yellow-400 shadow-[2px_2px_0_0_#000] active:translate-y-1 active:shadow-none transition-all"
            >
                <Share2 size={18} /> Share
            </button>
        </div>

        {/* Metadata Comic Box */}
        <div className="mb-8 bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-600 p-4 flex flex-wrap gap-6 items-center justify-center text-sm font-bold uppercase tracking-wide shadow-comic dark:shadow-none">
            <div className="flex items-center gap-2 text-comic-blue dark:text-blue-400">
                <User size={18} />
                <span>{postData.metadata.author || 'uug4na'}</span>
            </div>
            <div className="w-1 h-4 bg-gray-300 dark:bg-gray-600 hidden sm:block"></div>
            <div className="flex items-center gap-2 text-comic-purple dark:text-purple-400">
                <Calendar size={18} />
                <span>{displayDate}</span>
            </div>
            <div className="w-1 h-4 bg-gray-300 dark:bg-gray-600 hidden sm:block"></div>
            <div className="flex items-center gap-2 text-comic-green dark:text-green-400">
                <Clock size={18} />
                <span>{postData.readingTime} min read</span>
            </div>
        </div>

        <article className="prose prose-lg md:prose-xl max-w-none font-body dark:prose-invert">
            {/* Title */}
            <h1 className="font-display text-5xl md:text-6xl text-black dark:text-white mb-6 leading-tight text-center md:text-left">
                {displayTitle}
            </h1>

            {/* Reading Content - Optimized for Psychology of Reading */}
            {/* 
               Changes for readability:
               1. 'font-body' uses Inter (sans-serif) for easier scanning.
               2. Removed distracting rotations and heavy borders from text elements.
               3. Increased line-height (relaxed) and ensured text contrast is high but not jarring.
            */}
            <div className="markdown-content text-gray-800 dark:text-gray-200 leading-relaxed">
                <ReactMarkdown
                  components={{
                    h1: ({node, ...props}) => <h2 className="font-display text-4xl mt-10 mb-6 border-b-2 border-comic-green pb-2 text-black dark:text-white" {...props} />,
                    h2: ({node, ...props}) => <h3 className="font-display text-3xl mt-8 mb-4 text-comic-purple dark:text-purple-400" {...props} />,
                    h3: ({node, ...props}) => <h4 className="font-display text-2xl mt-6 mb-3 text-comic-blue dark:text-blue-400" {...props} />,
                    p: ({node, ...props}) => <p className="mb-6 text-lg md:text-xl leading-8" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-outside ml-6 mb-6 marker:text-comic-red" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-6 mb-6 marker:font-bold" {...props} />,
                    blockquote: ({node, ...props}) => (
                        <blockquote className="border-l-4 border-comic-yellow bg-gray-50 dark:bg-gray-800/50 p-4 my-8 pl-6 italic text-gray-700 dark:text-gray-300" {...props}>
                            {props.children}
                        </blockquote>
                    ),
                    code: ({node, ...props}) => {
                         const isInline = !String(props.className).includes("language-");
                         return isInline 
                            ? <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded font-mono text-sm text-comic-red dark:text-red-400" {...props} />
                            : <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto my-8 font-mono text-sm shadow-md" {...(props as any)} />
                    },
                    img: ({node, ...props}) => (
                        <div className="my-10">
                             <img className="w-full h-auto rounded-md shadow-sm border border-gray-200 dark:border-gray-700" {...props} alt={props.alt || 'Article image'} />
                             {props.alt && <p className="text-center text-sm text-gray-500 mt-3 italic">{props.alt}</p>}
                        </div>
                    ),
                    a: ({node, ...props}) => <a className="text-comic-blue dark:text-blue-400 font-semibold underline hover:text-comic-purple dark:hover:text-purple-400 transition-colors" {...props} />
                  }}
                >
                    {postData.content}
                </ReactMarkdown>
            </div>
        </article>
        
        {/* Footer Area */}
        <div className="mt-12 pt-8 border-t-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center gap-4">
             <div className="font-display text-2xl text-gray-400 uppercase">End of Issue</div>
             <Link to="/">
                <ComicButton label="Read Next Issue" variant="secondary" />
             </Link>
        </div>
    </div>
  );
};

export default PostView;