import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, User, BookOpen, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`min-h-screen flex flex-col font-comic transition-colors duration-300 ${theme === 'dark' ? 'text-gray-100' : 'text-black'}`}>
      {/* Header / Masthead */}
      <header className="bg-comic-green border-b-4 border-black p-4 sticky top-0 z-50 shadow-comic dark:bg-green-900 dark:border-gray-600 dark:shadow-none">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="group relative">
             <div className="absolute -inset-2 bg-black skew-x-12 opacity-0 group-hover:opacity-20 transition-opacity rounded-sm"></div>
             <h1 className="font-display text-5xl text-white drop-shadow-[4px_4px_0_#000] rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
               THE uug4na CHRONICLES
             </h1>
          </Link>
          
          <nav className="flex gap-4 items-center">
            <Link to="/">
              <div className={`
                flex items-center gap-2 px-4 py-2 border-4 border-black font-display text-xl uppercase transition-transform hover:-translate-y-1 hover:shadow-comic
                ${isActive('/') ? 'bg-comic-yellow -translate-y-1 shadow-comic dark:bg-yellow-600' : 'bg-white dark:bg-gray-800'}
                dark:border-gray-900 dark:text-white
              `}>
                <BookOpen size={24} />
                <span className="hidden sm:inline">Stories</span>
              </div>
            </Link>
            <Link to="/about">
              <div className={`
                flex items-center gap-2 px-4 py-2 border-4 border-black font-display text-xl uppercase transition-transform hover:-translate-y-1 hover:shadow-comic
                ${isActive('/about') ? 'bg-comic-purple text-white -translate-y-1 shadow-comic dark:bg-purple-900' : 'bg-white dark:bg-gray-800'}
                 dark:border-gray-900 dark:text-white
              `}>
                <User size={24} />
                <span className="hidden sm:inline">Me</span>
              </div>
            </Link>
            
            <button 
              onClick={toggleTheme}
              className="p-2 border-4 border-black bg-white hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-yellow-400 transition-all rounded-full"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-8 max-w-5xl mx-auto w-full">
        <div className="bg-paper-white dark:bg-dark-paper border-4 border-black dark:border-gray-700 shadow-comic-lg dark:shadow-none min-h-[600px] p-6 md:p-10 relative overflow-hidden transition-colors duration-300">
            {/* Comic details */}
            <div className="absolute top-2 left-2 text-xs font-bold border-2 border-black dark:border-gray-500 px-2 py-1 bg-white dark:bg-gray-800 dark:text-white uppercase">
                Vol. 1
            </div>
            
            {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white p-6 mt-8 text-center font-display tracking-widest uppercase dark:bg-gray-900 dark:border-t-4 dark:border-gray-700">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-2">
            <Zap className="text-comic-yellow w-8 h-8 animate-pulse" />
            <p>Made with Pizza & Code by uug4na</p>
            <p className="text-sm font-comic normal-case text-gray-400">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;