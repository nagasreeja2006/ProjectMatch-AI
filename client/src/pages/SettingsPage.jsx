import React, { useState, useEffect } from 'react';
import {
  Settings,
  Sun,
  Moon,
  Shield,
  Activity,
  User,
  Database,
  Sparkles,
  Laptop,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { systemService } from '../services/api';
import Button from '../components/ui/Button';

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, demoLogin } = useAuth();

  const [health, setHealth] = useState(null);
  const [checkingHealth, setCheckingHealth] = useState(false);

  const checkHealth = async () => {
    setCheckingHealth(true);
    try {
      const res = await systemService.getHealth();
      setHealth(res.data);
    } catch (e) {
      setHealth({ status: 'offline', database: 'Unreachable' });
    } finally {
      setCheckingHealth(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Settings className="w-6 h-6 text-slate-500" />
          <span>System & Account Settings</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage application theme, review system health, and inspect AI service configuration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appearance & Theme Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            {theme === 'dark' ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
            <span>Appearance & Theme</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select between modern dark and clean light color schemes. Theme preference is automatically preserved.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => theme === 'dark' && toggleTheme()}
              className={`flex-1 p-4 rounded-2xl border text-center transition-all ${
                theme === 'light'
                  ? 'border-blue-600 bg-blue-50/80 text-blue-700 font-bold shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Sun className="w-5 h-5 mx-auto mb-1 text-amber-500" />
              <span className="text-xs">Light Mode</span>
            </button>

            <button
              onClick={() => theme === 'light' && toggleTheme()}
              className={`flex-1 p-4 rounded-2xl border text-center transition-all ${
                theme === 'dark'
                  ? 'border-blue-500 bg-blue-950/60 text-blue-300 font-bold shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Moon className="w-5 h-5 mx-auto mb-1 text-indigo-400" />
              <span className="text-xs">Dark Mode</span>
            </button>
          </div>
        </div>

        {/* Demo Mode & Quick Access */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Laptop className="w-5 h-5 text-blue-500" />
            <span>Demo Mode State</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {user?.isDemoUser
              ? 'You are currently logged in as Demo Student. You can test recommendations, blueprint generator, and task tracking.'
              : 'Switch to the pre-seeded Demo Student profile anytime for rapid evaluation.'}
          </p>

          <div className="pt-2">
            <Button
              variant="outline"
              size="md"
              onClick={demoLogin}
              className="w-full text-xs"
              leftIcon={<Sparkles className="w-4 h-4 text-amber-500" />}
            >
              {user?.isDemoUser ? 'Reset Demo Student Account' : 'Switch to Demo Student'}
            </Button>
          </div>
        </div>

        {/* System & AI Service Status */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 md:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-500" />
              <span>Backend & AI Architecture Status</span>
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={checkHealth}
              isLoading={checkingHealth}
              className="text-xs"
            >
              Refresh
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
              <span className="text-slate-400 font-medium">Server API Gateway</span>
              <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>{health?.status === 'online' ? 'Operational' : 'Offline'}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
              <span className="text-slate-400 font-medium">Data Storage Engine</span>
              <div className="flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 text-sm">
                <Database className="w-4 h-4" />
                <span>{health?.database || 'Connected'}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
              <span className="text-slate-400 font-medium">AI Recommendation Mode</span>
              <div className="flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                <Sparkles className="w-4 h-4" />
                <span>
                  {health?.geminiConfigured
                    ? 'Google Gemini 1.5 API Active'
                    : 'Deterministic AI Engine Active'}
                </span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            Note: When <code className="text-blue-500">GEMINI_API_KEY</code> is provided in <code className="text-blue-500">.env</code>, requests call Google Gemini API with Zod validation. If unset or offline, our deterministic multi-factor algorithm guarantees 100% uninterrupted recommendations.
          </p>
        </div>

        {/* Account Details & Logout */}
        {user && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 md:col-span-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-500" />
              <span>Session Management</span>
            </h3>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="text-xs space-y-0.5">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Signed in as {user.name} ({user.email})
                </span>
                <p className="text-slate-400">Token-based authentication active with JWT session.</p>
              </div>

              <Button variant="danger" size="sm" onClick={logout} className="shrink-0 text-xs">
                Log Out of Account
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
