import { AlertTriangle, AlertCircle, CheckCircle, XCircle, Clock, Bell } from 'lucide-react';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  binId?: string;
  binName?: string;
  timestamp: string;
  resolved: boolean;
}

const MOCK_ALERTS: Alert[] = [
  {
    id: 'alert-1',
    type: 'critical',
    title: 'Bin Full - Immediate Action Required',
    message: 'Bin has reached 95% capacity and needs immediate collection.',
    binId: 'BIN-004',
    binName: 'University Campus',
    timestamp: '2026-02-03T10:30:00',
    resolved: false,
  },
  {
    id: 'alert-2',
    type: 'critical',
    title: 'Multiple Bins Full',
    message: 'Airport Terminal bin has reached 88% capacity.',
    binId: 'BIN-006',
    binName: 'Airport Terminal',
    timestamp: '2026-02-03T09:15:00',
    resolved: false,
  },
  {
    id: 'alert-3',
    type: 'warning',
    title: 'Low Battery Warning',
    message: 'Battery level at 52%. Schedule maintenance soon.',
    binId: 'BIN-006',
    binName: 'Airport Terminal',
    timestamp: '2026-02-03T08:45:00',
    resolved: false,
  },
  {
    id: 'alert-4',
    type: 'warning',
    title: 'High Temperature',
    message: 'Internal temperature is above normal at 28°C.',
    binId: 'BIN-002',
    binName: 'Tech District',
    timestamp: '2026-02-03T07:20:00',
    resolved: true,
  },
  {
    id: 'alert-5',
    type: 'info',
    title: 'Collection Completed',
    message: 'Scheduled collection completed successfully.',
    binId: 'BIN-005',
    binName: 'Downtown Center',
    timestamp: '2026-02-03T06:00:00',
    resolved: true,
  },
  {
    id: 'alert-6',
    type: 'info',
    title: 'Maintenance Scheduled',
    message: 'Regular maintenance scheduled for tomorrow at 9:00 AM.',
    binId: 'BIN-003',
    binName: 'Green Park Station',
    timestamp: '2026-02-02T16:30:00',
    resolved: true,
  },
];

export function AlertsPanel() {
  const activeAlerts = MOCK_ALERTS.filter(alert => !alert.resolved);
  const resolvedAlerts = MOCK_ALERTS.filter(alert => alert.resolved);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      case 'info':
        return <Bell className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'text-red-600';
      case 'warning':
        return 'text-yellow-600';
      case 'info':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-red-900">Critical Alerts</h3>
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="text-3xl font-bold text-red-600">
            {activeAlerts.filter(a => a.type === 'critical').length}
          </div>
          <div className="text-sm text-red-700 mt-1">Require immediate action</div>
        </div>

        <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-yellow-900">Warnings</h3>
            <AlertCircle className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-3xl font-bold text-yellow-600">
            {activeAlerts.filter(a => a.type === 'warning').length}
          </div>
          <div className="text-sm text-yellow-700 mt-1">Need attention soon</div>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-blue-900">Info</h3>
            <Bell className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-600">
            {activeAlerts.filter(a => a.type === 'info').length}
          </div>
          <div className="text-sm text-blue-700 mt-1">For your information</div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Active Alerts</h3>
          <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            Mark All as Read
          </button>
        </div>

        {activeAlerts.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">All Clear!</h4>
            <p className="text-gray-600">No active alerts at the moment</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeAlerts.map(alert => (
              <div
                key={alert.id}
                className={`border rounded-xl p-4 ${getAlertColor(alert.type)}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`${getIconColor(alert.type)} mt-1`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{alert.title}</h4>
                        <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                        {alert.binName && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="font-medium">{alert.binName}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-xs">{alert.binId}</span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4 flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-4 h-4" />
                        {formatTime(alert.timestamp)}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {alert.type === 'critical' && (
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                          Schedule Collection
                        </button>
                      )}
                      <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        View Details
                      </button>
                      <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        Resolve
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resolved Alerts History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Resolved Alerts</h3>
        <div className="space-y-3">
          {resolvedAlerts.map(alert => (
            <div
              key={alert.id}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 opacity-60"
            >
              <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{alert.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                    {alert.binName && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <span>{alert.binName}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-xs">{alert.binId}</span>
                      </div>
                    )}
                  </div>
                  <div className="ml-4 text-xs text-gray-500">{formatTime(alert.timestamp)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Alert Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-600">Receive alerts via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">SMS Notifications</h4>
              <p className="text-sm text-gray-600">Receive critical alerts via SMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Push Notifications</h4>
              <p className="text-sm text-gray-600">Receive alerts on mobile app</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
