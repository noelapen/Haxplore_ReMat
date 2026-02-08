import { Bell, CheckCircle, AlertTriangle, Info, X, Clock } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationsProps {
  isOpen: boolean;
  onClose: () => void;
  userType: 'user' | 'admin';
}

const USER_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Recycling Completed',
    message: 'You earned 150 points for recycling a smartphone!',
    timestamp: '2026-02-04T10:30:00',
    read: false,
  },
  {
    id: '2',
    type: 'info',
    title: 'New Reward Available',
    message: 'You can now redeem a $10 Amazon gift card with your points.',
    timestamp: '2026-02-03T15:20:00',
    read: false,
  },
  {
    id: '3',
    type: 'success',
    title: 'Achievement Unlocked',
    message: 'Congratulations! You earned the "10 Items Milestone" badge.',
    timestamp: '2026-02-02T09:15:00',
    read: true,
  },
  {
    id: '4',
    type: 'info',
    title: 'Bin Nearby',
    message: 'A new e-waste bin has opened 0.5 km from your location.',
    timestamp: '2026-02-01T14:00:00',
    read: true,
  },
];

const ADMIN_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Bin Full Alert',
    message: 'University Campus Station bin has reached 95% capacity.',
    timestamp: '2026-02-04T11:00:00',
    read: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Low Battery Warning',
    message: 'Airport Terminal bin battery level at 52%.',
    timestamp: '2026-02-04T10:15:00',
    read: false,
  },
  {
    id: '3',
    type: 'success',
    title: 'Collection Completed',
    message: 'Pickup completed successfully at Downtown Center.',
    timestamp: '2026-02-04T08:30:00',
    read: false,
  },
  {
    id: '4',
    type: 'info',
    title: 'New User Registrations',
    message: '45 new users registered today.',
    timestamp: '2026-02-03T16:00:00',
    read: true,
  },
  {
    id: '5',
    type: 'info',
    title: 'Maintenance Scheduled',
    message: 'Regular maintenance scheduled for Green Park Station tomorrow at 9:00 AM.',
    timestamp: '2026-02-03T12:00:00',
    read: true,
  },
];

export function Notifications({ isOpen, onClose, userType }: NotificationsProps) {
  const notifications = userType === 'admin' ? ADMIN_NOTIFICATIONS : USER_NOTIFICATIONS;
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIconAndColor = (type: string) => {
    switch (type) {
      case 'success':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
      case 'warning':
        return { icon: AlertTriangle, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
      case 'info':
        return { icon: Info, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
      default:
        return { icon: Info, color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' };
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      ></div>

      {/* Notification Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-gray-700" />
              <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          {unreadCount > 0 && (
            <div className="text-sm text-gray-600">
              You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <Bell className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600 text-sm">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map(notification => {
                const { icon: Icon, color, bg, border } = getIconAndColor(notification.type);
                return (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-emerald-50/30' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`${bg} ${border} border rounded-lg p-2 flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900 text-sm">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-emerald-600 rounded-full flex-shrink-0 mt-1.5"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {formatTime(notification.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <button className="w-full py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
              Mark all as read
            </button>
          </div>
        )}
      </div>
    </>
  );
}
