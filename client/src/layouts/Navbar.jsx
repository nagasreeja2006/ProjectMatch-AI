import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, Sun, Moon, Sparkles, User, LogIn, Laptop } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const Navbar = ({ onOpenSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, demoLogin } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-800 dark:text-slate-200">ProjectMatch AI</span>
          <span>/</span>
          <span className="capitalize">{window.location.pathname.replace('/', '') || 'Dashboard'}</span>
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Quick Action: Find AI Projects */}
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/recommendations')}
          leftIcon={<Sparkles className="w-3.5 h-3.5 text-amber-300" />}
          className="hidden sm:inline-flex text-xs"
        >
          Find My Projects
        </Button>

        {/* Demo login button if not logged in */}
        {!isAuthenticated && (
          <Button
            variant="outline"
            size="sm"
            onClick={demoLogin}
            leftIcon={<Laptop className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            Demo Mode
          </Button>
        )}

        {/* Dark/Light mode toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        </button>

        {/* Profile Avatar or Login */}
        {isAuthenticated && user ? (
          <NavLink
            to="/profile"
            className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 hidden md:inline truncate max-w-[100px]">
              {user.name}
            </span>
          </NavLink>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/login')}
            leftIcon={<LogIn className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
