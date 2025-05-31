import React, { useEffect } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { ThemeType } from '../../types';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useStore();

  // Apply the theme when it changes or on initial load
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(mediaQuery.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-md transition-colors ${
          theme === 'light' 
            ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-600 dark:text-blue-400' 
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
        }`}
        title="Light mode"
      >
        <Sun size={18} />
      </button>
      
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-md transition-colors ${
          theme === 'dark' 
            ? 'bg-gray-800 text-blue-400 shadow-sm' 
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
        }`}
        title="Dark mode"
      >
        <Moon size={18} />
      </button>
      
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-md transition-colors ${
          theme === 'system' 
            ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm' 
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
        }`}
        title="System preference"
      >
        <Monitor size={18} />
      </button>
    </div>
  );
};

export default ThemeToggle;