import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';

const AboutMe: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
       <div className="flex flex-col md:flex-row gap-8 items-start">
           
           {/* Profile Picture / Avatar Frame */}
           <div className="w-full md:w-1/3 shrink-0">
               <div className="border-4 border-black dark:border-gray-600 p-2 bg-comic-yellow dark:bg-yellow-700 -rotate-3 shadow-comic dark:shadow-none">
                   <img 
                     src="https://github.com/uug4na.png" 
                     alt="uug4na avatar" 
                     className="w-full h-auto border-2 border-black dark:border-gray-900 grayscale contrast-125" 
                   />
                   <div className="text-center font-display text-2xl mt-2 uppercase text-black dark:text-white">
                       The Author
                   </div>
               </div>
           </div>

           {/* Content */}
           <div className="flex-grow">
               <h1 className="font-display text-6xl mb-6 text-comic-green drop-shadow-[3px_3px_0_#000] dark:drop-shadow-none dark:text-green-500">
                   uug4na
               </h1>
               
               <div className="prose prose-lg font-comic text-black dark:text-gray-200 mb-8">
                   <p className="text-xl font-bold mb-4">
                       I am just a 20 y.o dude who got laptop, trying to make cool stuff.
                   </p>
               </div>

               <div className="flex flex-wrap gap-4">
                   <a 
                     href="https://github.com/uug4na" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex items-center gap-2 bg-black text-white px-6 py-3 font-display text-xl hover:bg-gray-800 border-2 border-transparent hover:border-comic-yellow transition-all"
                   >
                       <Github size={24} /> GitHub
                   </a>
                   <a 
                     href="https://x.com/uug4na_" 
                     className="flex items-center gap-2 bg-comic-blue text-white px-6 py-3 font-display text-xl border-4 border-black dark:border-gray-600 shadow-comic dark:shadow-none hover:translate-y-1 hover:shadow-none transition-all"
                   >
                       <Twitter size={24} /> Twitter
                   </a>
                   <a 
                     href="mailto:uug4na@gmail.com" 
                     className="flex items-center gap-2 bg-white text-black px-6 py-3 font-display text-xl border-4 border-black dark:border-gray-600 shadow-comic dark:shadow-none hover:translate-y-1 hover:shadow-none transition-all"
                   >
                       <Mail size={24} /> Contact
                   </a>
               </div>
           </div>
       </div>
    </div>
  );
};

export default AboutMe;