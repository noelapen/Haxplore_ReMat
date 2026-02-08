import { useState, useEffect } from 'react';
import { BinFinder } from './user/BinFinder';
import { WasteDetection } from './user/WasteDetection';
import { UserProfile } from './user/UserProfile';
import { Notifications } from './Notifications';
import { SimpleTutorial } from './SimpleTutorial';
import { FriendlyMascot } from './FriendlyMascot';
import { EnhancedMascotWelcome } from './EnhancedMascotWelcome';
import { AllFeaturesPage } from './AllFeaturesPage';
import { SettingsPage } from './SettingsPage';
import { OfflineBanner } from './OfflineBanner';
import { 
  Map, 
  ScanLine, 
  User as UserIcon, 
  LogOut, 
  Home, 
  Bell, 
  HelpCircle,
  Sparkles,
  Settings
} from 'lucide-react';

interface UserDashboardProps {
  user: any;
  onLogout: () => void;
}

type ActiveView = 'home' | 'finder' | 'scan' | 'profile' | 'features' | 'settings';

export function UserDashboard({ user, onLogout }: UserDashboardProps) {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [userData, setUserData] = useState(user);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showMascot, setShowMascot] = useState(false);
  const [showMascotWelcome, setShowMascotWelcome] = useState(false);

  // Check if this is the user's first time
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem(`tutorial_completed_${user.id}`);
    const dontShowAgain = localStorage.getItem('tutorial_dont_show');
    
    if (!hasSeenTutorial && !dontShowAgain) {
      // Show tutorial after a short delay for better UX
      const timer = setTimeout(() => {
        setShowTutorial(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [user.id]);

  const handleTutorialComplete = () => {
    localStorage.setItem(`tutorial_completed_${user.id}`, 'true');
    setShowTutorial(false);
    // Show mascot welcome after tutorial
    setTimeout(() => {
      setShowMascotWelcome(true);
    }, 300);
  };

  const handleMascotWelcomeComplete = () => {
    setShowMascotWelcome(false);
  };

  const handleRestartTutorial = () => {
    setShowTutorial(true);
  };

  const handleRecyclingComplete = (item: any) => {
    // Update user data with new points and stats
    setUserData((prev: any) => ({
      ...prev,
      points: prev.points + item.points,
      totalRecycled: prev.totalRecycled + 1,
      co2Saved: prev.co2Saved + item.co2Saved,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {userData.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">{userData.name}</div>
              <div className="text-sm text-emerald-600 dark:text-emerald-400" data-tutorial="points">{userData.points} Points</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRestartTutorial}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Restart Tutorial"
              aria-label="Restart tutorial"
            >
              <HelpCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              data-tutorial="notifications"
              onClick={() => setShowNotifications(true)}
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Open notifications"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-600 dark:bg-emerald-500 rounded-full"></span>
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Offline Mode Banner */}
      <OfflineBanner />

      {/* Tutorial Overlay */}
      <SimpleTutorial
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
        onComplete={handleTutorialComplete}
      />

      {/* Notifications Panel */}
      <Notifications
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        userType="user"
      />

      {/* Friendly Mascot */}
      {showMascot && activeView === 'home' && !showTutorial && (
        <FriendlyMascot
          message={`Welcome ${userData.name}! Let's recycle some e-waste today! 🌱`}
          position="bottom-right"
          autoHide={true}
        />
      )}

      {/* Mascot Welcome Message */}
      {showMascotWelcome && (
        <EnhancedMascotWelcome
          userName={userData.name}
          onComplete={handleMascotWelcomeComplete}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 pb-20">
        {activeView === 'home' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, {userData.name}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Let's make a positive impact on the environment today
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-500 mb-1">
                  {userData.points}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Points</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-500 mb-1">
                  {userData.totalRecycled}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Items Recycled</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-3xl font-bold text-green-600 dark:text-green-500 mb-1">
                  {userData.co2Saved.toFixed(1)} kg
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">CO₂ Saved</div>
              </div>
            </div>

            {/* Action Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => setActiveView('finder')}
                className="group bg-white dark:bg-white rounded-2xl p-8 text-left hover:shadow-xl transition-all hover:scale-105 border border-gray-200"
              >
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <Map className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-gray-900">Find E-Waste Bin</h2>
                <p className="text-gray-600 mb-4">
                  Locate the nearest bin for your e-waste
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
                  Start Finding
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </button>

              <button
                onClick={() => setActiveView('scan')}
                className="group bg-white dark:bg-white rounded-2xl p-8 text-left hover:shadow-xl transition-all hover:scale-105 border border-gray-200"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                  <ScanLine className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-gray-900">Scan & Dispose</h2>
                <p className="text-gray-600 mb-4">
                  Use AI detection to identify and recycle items
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                  Start Scanning
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </button>
            </div>

            {/* Environmental Impact */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Your Environmental Impact 🌍
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {(userData.totalRecycled * 0.5).toFixed(1)} kg
                  </div>
                  <div className="text-sm text-gray-600">E-waste diverted from landfills</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {(userData.totalRecycled * 15).toFixed(0)}
                  </div>
                  <div className="text-sm text-gray-600">Trees worth of oxygen saved</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {(userData.totalRecycled * 2).toFixed(0)} L
                  </div>
                  <div className="text-sm text-gray-600">Water saved</div>
                </div>
              </div>
            </div>

            {/* Quick Help / Tutorial Restart */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Need Help Getting Started?
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Watch our interactive tutorial to learn how to find bins, scan items, and earn rewards.
                  </p>
                  <button
                    onClick={handleRestartTutorial}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                  >
                    <HelpCircle className="w-4 h-4" />
                    View Tutorial
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'finder' && <BinFinder />}
        {activeView === 'scan' && (
          <WasteDetection user={userData} onRecyclingComplete={handleRecyclingComplete} />
        )}
        {activeView === 'profile' && <UserProfile user={userData} />}
        {activeView === 'features' && (
          <AllFeaturesPage />
        )}
        {activeView === 'settings' && (
          <SettingsPage />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 fixed bottom-0 left-0 right-0 z-30 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-around">
            <button
              data-tutorial="home-tab"
              onClick={() => setActiveView('home')}
              className={`flex flex-col items-center gap-1 py-3 px-4 transition-colors ${
                activeView === 'home' ? 'text-emerald-600 dark:text-emerald-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
              aria-label="Home"
              aria-current={activeView === 'home' ? 'page' : undefined}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button
              data-tutorial="finder-tab"
              onClick={() => setActiveView('finder')}
              className={`flex flex-col items-center gap-1 py-3 px-4 transition-colors ${
                activeView === 'finder' ? 'text-emerald-600 dark:text-emerald-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
              aria-label="Find Bins"
              aria-current={activeView === 'finder' ? 'page' : undefined}
            >
              <Map className="w-6 h-6" />
              <span className="text-xs font-medium">Find Bins</span>
            </button>
            <button
              data-tutorial="scan-tab"
              onClick={() => setActiveView('scan')}
              className={`flex flex-col items-center gap-1 py-3 px-4 transition-colors ${
                activeView === 'scan' ? 'text-emerald-600 dark:text-emerald-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
              aria-label="Scan Item"
              aria-current={activeView === 'scan' ? 'page' : undefined}
            >
              <ScanLine className="w-6 h-6" />
              <span className="text-xs font-medium">Scan</span>
            </button>
            <button
              data-tutorial="profile-tab"
              onClick={() => setActiveView('profile')}
              className={`flex flex-col items-center gap-1 py-3 px-4 transition-colors ${
                activeView === 'profile' ? 'text-emerald-600 dark:text-emerald-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
              aria-label="Profile"
              aria-current={activeView === 'profile' ? 'page' : undefined}
            >
              <UserIcon className="w-6 h-6" />
              <span className="text-xs font-medium">Profile</span>
            </button>
            <button
              onClick={() => setActiveView('features')}
              className={`flex flex-col items-center gap-1 py-3 px-4 transition-colors ${
                activeView === 'features' ? 'text-emerald-600 dark:text-emerald-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
              aria-label="Features"
              aria-current={activeView === 'features' ? 'page' : undefined}
            >
              <Sparkles className="w-6 h-6" />
              <span className="text-xs font-medium">Features</span>
            </button>
            <button
              onClick={() => setActiveView('settings')}
              className={`flex flex-col items-center gap-1 py-3 px-4 transition-colors ${
                activeView === 'settings' ? 'text-emerald-600 dark:text-emerald-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
              aria-label="Settings"
              aria-current={activeView === 'settings' ? 'page' : undefined}
            >
              <Settings className="w-6 h-6" />
              <span className="text-xs font-medium">Settings</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}