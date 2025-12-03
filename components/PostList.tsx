import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPostList, formatTitle } from '../services/githubService';
import { GitHubFile } from '../types';
import { ArrowRight, Loader2 } from 'lucide-react';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<GitHubFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPostList();
      setPosts(data);
      setLoading(false);
    };
    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
        <Loader2 className="w-16 h-16 animate-spin text-comic-blue dark:text-comic-yellow" />
        <h2 className="font-display text-3xl mt-4 dark:text-white">Loading issues...</h2>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="font-display text-4xl mb-4 dark:text-white">No Stories Found!</h2>
        <p className="text-xl dark:text-gray-300">The villain must have stolen all the manuscripts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="border-b-4 border-black dark:border-gray-600 pb-4 mb-8">
         <h2 className="font-display text-5xl uppercase tracking-tighter text-comic-red drop-shadow-[2px_2px_0_rgba(0,0,0,1)] dark:drop-shadow-none">
            Latest Issues
         </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post, index) => {
          // Creating a staggered grid effect for comic look
          const rotation = index % 2 === 0 ? '-rotate-1' : 'rotate-1';
          const bgColor = index % 3 === 0 ? 'bg-comic-yellow' : (index % 3 === 1 ? 'bg-comic-blue' : 'bg-comic-green');
          
          // Dark mode adjustments for banner
          const darkBgColor = index % 3 === 0 ? 'dark:bg-yellow-700' : (index % 3 === 1 ? 'dark:bg-blue-800' : 'dark:bg-green-800');
          const textColor = index % 3 === 1 ? 'text-white' : 'text-black';

          return (
            <Link 
              key={post.sha} 
              to={`/post/${post.name}`}
              className={`block group relative transition-transform hover:scale-[1.02] hover:z-10`}
            >
              {/* Card Container */}
              <div className={`h-full border-4 border-black dark:border-gray-600 p-0 shadow-comic dark:shadow-none group-hover:shadow-comic-lg transition-all ${rotation} bg-white dark:bg-gray-800 flex flex-col`}>
                
                {/* Image Placeholder / Banner area */}
                <div className={`${bgColor} ${darkBgColor} h-32 border-b-4 border-black dark:border-gray-600 flex items-center justify-center overflow-hidden relative`}>
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black to-transparent w-full h-full scale-150"></div>
                    <span className="font-display text-6xl opacity-50 select-none absolute right-2 bottom-0 text-black/20 dark:text-white/10">POW!</span>
                    <span className={`font-display text-2xl uppercase ${textColor} z-10 relative px-4 text-center drop-shadow-md`}>
                        Issue #{index + 1}
                    </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-3xl leading-none mb-3 group-hover:text-comic-red transition-colors dark:text-gray-100">
                      {formatTitle(post.name)}
                    </h3>
                    <p className="font-comic text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                      Click to read the thrilling conclusion of this article!
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-end">
                    <span className="font-display text-lg flex items-center gap-1 group-hover:underline decoration-4 decoration-comic-red underline-offset-4 dark:text-gray-200">
                      Read Now <ArrowRight size={20} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PostList;