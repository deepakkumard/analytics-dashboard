import React, { useEffect } from 'react';
import { useStore } from './store/useStore';
import Dashboard from './components/Dashboard/Dashboard';
import ThemeToggle from './components/UI/ThemeToggle';
import WidgetMenu from './components/Dashboard/WidgetMenu';
import { LayoutDashboard } from 'lucide-react';

function App() {
  const { addWidget } = useStore();

  // Apply theme on initial load
  useEffect(() => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.add(darkMode ? 'dark' : 'light');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <LayoutDashboard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-xl font-bold">Interactive Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <WidgetMenu onAddWidget={addWidget} />
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Dashboard />
      </main>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-4 text-center text-gray-500 dark:text-gray-400 text-sm">
        <div className="container mx-auto px-4">
          Interactive Dashboard &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}

export default App;