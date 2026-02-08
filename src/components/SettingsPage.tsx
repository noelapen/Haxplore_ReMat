import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, Wifi, WifiOff, Bell, Globe, Shield, HelpCircle } from 'lucide-react';

export function SettingsPage() {
  const { darkMode, toggleDarkMode, offlineMode, setOfflineMode } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Manage your preferences and app settings</p>

        {/* Appearance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-4 transition-colors">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-white">Appearance</h2>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  darkMode ? 'bg-indigo-100 dark:bg-indigo-900/50' : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  {darkMode ? (
                    <Moon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  ) : (
                    <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Dark Mode</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {darkMode ? 'Enabled' : 'Disabled'}
                  </div>
                </div>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  darkMode ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Connectivity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-4 transition-colors">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-white">Connectivity</h2>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  offlineMode ? 'bg-orange-100 dark:bg-orange-900/50' : 'bg-green-100 dark:bg-green-900/50'
                }`}>
                  {offlineMode ? (
                    <WifiOff className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  ) : (
                    <Wifi className="w-5 h-5 text-green-600 dark:text-green-400" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Offline Mode</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {offlineMode ? 'Working offline' : 'Connected'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOfflineMode(!offlineMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  offlineMode ? 'bg-orange-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    offlineMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-4 transition-colors">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-white">Notifications</h2>
          </div>
          <div className="space-y-4 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-white">Push Notifications</span>
              </div>
              <button
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-600"
              >
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-4 transition-colors">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-white">Privacy & Security</h2>
          </div>
          <div className="space-y-3 p-4">
            <button className="w-full flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-white">Privacy Policy</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-white">Language</span>
              </div>
              <span className="text-gray-500 dark:text-gray-400">English</span>
            </button>
          </div>
        </div>

        {/* Support */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-white">Support</h2>
          </div>
          <div className="space-y-3 p-4">
            <button className="w-full flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-white">Help Center</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
