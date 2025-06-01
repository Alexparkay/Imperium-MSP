import React, { useState, useEffect } from 'react';
import ThemeContext from './ThemeContext';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}) => {
  // Initialize theme with 'dark' as default, will be updated from localStorage after mount
  const [theme, setTheme] = useState('dark');
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side before accessing localStorage
  useEffect(() => {
    setIsClient(true);
    
    // Only access localStorage after component mounts on client
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.warn('Failed to access localStorage:', error);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Only update localStorage if we're on the client
    if (isClient) {
      try {
        localStorage.setItem('theme', newTheme);
      } catch (error) {
        console.warn('Failed to save theme to localStorage:', error);
      }
    }
  };

  useEffect(() => {
    if (isClient) {
      const htmlElement = document.querySelector('html');
      if (htmlElement) {
        htmlElement.setAttribute('data-theme', theme);
      }
      
      // Also set a class for additional CSS targeting if needed
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme, isClient]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
