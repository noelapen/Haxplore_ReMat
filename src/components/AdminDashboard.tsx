import { useState } from 'react';
import { BinMonitoring } from './admin/BinMonitoring';
import { Analytics } from './admin/Analytics';
import { AlertsPanel } from './admin/AlertsPanel';
import { UserManagement } from './admin/UserManagement';
import { Notifications } from './Notifications';
import { AdminTutorial } from './AdminTutorial';
import { EnhancedMascotWelcome } from './EnhancedMascotWelcome';
import {
  LayoutDashboard,
  MapPin,
  BarChart3,
  AlertTriangle,
  Users,
  LogOut,
  Bell,
  HelpCircle,
} from 'lucide-react';

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
}

type ActiveView = 'overview' | 'bins' | 'analytics' | 'alerts' | 'users';

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeView, setActiveView] = useState<ActiveView>('overview');
  const [alertCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTutorial, setShowTutorial] = useState(() => {
    return !localStorage.getItem('admin_tutorial_dont_show');
  });
  const [showMascot, setShowMascot] = useState(false);

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    setShowMascot(true);
  };

  const handleMascotComplete = () => {
    setShowMascot(false);
  };

  const handleRestartTutorial = () => {
    setShowTutorial(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900">E-Waste Admin</div>
              <div className="text-xs text-gray-500">Management Portal</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <button
              onClick={() => setActiveView('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeView === 'overview'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">Overview</span>
            </button>

            <button
              onClick={() => setActiveView('bins')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeView === 'bins'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Bin Monitoring</span>
            </button>

            <button
              onClick={() => setActiveView('analytics')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeView === 'analytics'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium">Analytics</span>
            </button>

            <button
              onClick={() => setActiveView('alerts')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative ${
                activeView === 'alerts'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">Alerts</span>
              {alertCount > 0 && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {alertCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveView('users')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeView === 'users'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">Users</span>
            </button>
          </div>
        </nav>

        {/* Admin Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 truncate">{user.name}</div>
              <div className="text-xs text-gray-500">Administrator</div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeView === 'overview' && 'Dashboard Overview'}
                {activeView === 'bins' && 'Bin Monitoring'}
                {activeView === 'analytics' && 'Analytics & Reports'}
                {activeView === 'alerts' && 'System Alerts'}
                {activeView === 'users' && 'User Management'}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {activeView === 'overview' && 'Real-time system overview and key metrics'}
                {activeView === 'bins' && 'Monitor all smart bins in real-time'}
                {activeView === 'analytics' && 'Track performance and trends'}
                {activeView === 'alerts' && 'Manage system notifications'}
                {activeView === 'users' && 'View and manage user accounts'}
              </p>
            </div>
            <button
              onClick={() => setShowNotifications(true)}
              className="relative p-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-6 h-6 text-gray-600" />
              {alertCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
          </div>
        </header>

        {/* Notifications Panel */}
        <Notifications
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
          userType="admin"
        />

        {/* Content Area */}
        <div className="p-8">
          {activeView === 'overview' && <OverviewDashboard />}
          {activeView === 'bins' && <BinMonitoring />}
          {activeView === 'analytics' && <Analytics />}
          {activeView === 'alerts' && <AlertsPanel />}
          {activeView === 'users' && <UserManagement />}
        </div>
      </main>

      {/* Tutorial for first-time admin users */}
      <AdminTutorial
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
        onComplete={handleTutorialComplete}
      />

      {/* Mascot Welcome after tutorial */}
      {showMascot && (
        <EnhancedMascotWelcome
          userName={user.name}
          onComplete={handleMascotComplete}
        />
      )}
    </div>
  );
}

// Overview Dashboard Component
function OverviewDashboard() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
              +2 this week
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">48</div>
          <div className="text-sm text-gray-600">Total Smart Bins</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
              +12% today
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">1,247</div>
          <div className="text-sm text-gray-600">Items Collected Today</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
              +45 today
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">8,932</div>
          <div className="text-sm text-gray-600">Active Users</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
              Needs attention
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">3</div>
          <div className="text-sm text-gray-600">Active Alerts</div>
        </div>
      </div>

      {/* Map and Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Geographic Overview */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Geographic Overview</h3>
          <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Interactive Map</h4>
              <p className="text-sm text-gray-600">All 48 bins shown on map</p>
            </div>
            {/* Mock bin markers */}
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 left-2/3 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute top-2/3 left-1/2 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute top-3/4 left-3/4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Operational (42)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">Nearly Full (3)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">Full (3)</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { time: '2 min ago', event: 'Bin #23 reached 95% capacity', type: 'warning' },
              { time: '15 min ago', event: 'New user registered', type: 'info' },
              { time: '32 min ago', event: 'Collection completed at Bin #12', type: 'success' },
              { time: '1 hour ago', event: 'Bin #45 maintenance scheduled', type: 'info' },
              { time: '2 hours ago', event: 'High usage detected at Bin #8', type: 'warning' },
            ].map((activity, idx) => (
              <div key={idx} className="flex gap-3">
                <div
                  className={`w-2 h-2 mt-2 rounded-full ${
                    activity.type === 'warning'
                      ? 'bg-yellow-500'
                      : activity.type === 'success'
                      ? 'bg-green-500'
                      : 'bg-blue-500'
                  }`}
                ></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-900">{activity.event}</div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-6 text-white">
          <h4 className="text-emerald-100 mb-2">Environmental Impact</h4>
          <div className="text-3xl font-bold mb-1">2,450 kg</div>
          <div className="text-emerald-100 text-sm">CO₂ emissions prevented this month</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
          <h4 className="text-blue-100 mb-2">Collection Efficiency</h4>
          <div className="text-3xl font-bold mb-1">94%</div>
          <div className="text-blue-100 text-sm">On-time collection rate</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
          <h4 className="text-purple-100 mb-2">User Engagement</h4>
          <div className="text-3xl font-bold mb-1">87%</div>
          <div className="text-purple-100 text-sm">Active user retention rate</div>
        </div>
      </div>
    </div>
  );
}