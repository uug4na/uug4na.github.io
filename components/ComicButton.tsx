import React from 'react';

interface ComicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  label: string;
  icon?: React.ReactNode;
}

const ComicButton: React.FC<ComicButtonProps> = ({ 
  variant = 'primary', 
  label, 
  icon, 
  className = '',
  ...props 
}) => {
  const baseStyle = "font-display text-xl uppercase tracking-wider border-4 border-black dark:border-gray-600 px-6 py-2 transform transition-all active:translate-y-1 active:shadow-none flex items-center gap-2";
  
  const variants = {
    primary: "bg-comic-yellow hover:bg-yellow-400 shadow-comic dark:shadow-none text-black",
    secondary: "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-comic dark:shadow-none text-black dark:text-white",
    danger: "bg-comic-red hover:bg-red-500 shadow-comic dark:shadow-none text-white",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
};

export default ComicButton;