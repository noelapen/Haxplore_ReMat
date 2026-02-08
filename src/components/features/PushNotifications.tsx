import { useState, useEffect } from 'react';
import { Bell, BellOff, X, MapPin, Award, Calendar, TrendingUp } from 'lucide-react';

interface Notification {
  id: string;
  type: 'bin' | 'reward' | 'event' | 'milestone';
  title: string;
  message: string;
  time: Date;
  read: boolean;
}

export function PushNotificationsSystem() {
  const [enabled, setEnabled] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'bin',
      title: 'Nearby Bin Available',
      message: 'A compatible e-waste bin is 0.3 km away!',
      time: new Date(Date.now() - 300000),
      read: false,
    },
    {
      id: '2',
      type: 'reward',
      title: 'Milestone Reached!',
      message: 'You have earned 500 points! Unlock new rewards.',
      time: new Date(Date.now() - 600000),
      read: false,
    },
    {
      id: '3',
      type: 'event',
      title: 'Special Event',
      message: 'Double points weekend starts tomorrow!',
      time: new Date(Date.now() - 900000),
      read: true,
    },
  ]);

  useEffect(() => {
    if (enabled && 'Notification' in window) {
      Notification.requestPermission();
    }
  }, [enabled]);

  const sendTestNotification = () => {
    if (enabled && 'Notification' in window && Notification.permission === 'granted') {
      new Notification('Smart E-Waste', {
        body: 'You have a new notification!',
        icon: '/icon.png',
        badge: '/badge.png',
      });
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'bin': return MapPin;
      case 'reward': return Award;
      case 'event': return Calendar;
      case 'milestone': return TrendingUp;
      default: return Bell;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            {enabled ? <Bell className="w-6 h-6 text-blue-600" /> : <BellOff className="w-6 h-6 text-gray-400" />}
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Push Notifications</h3>
            <p className="text-sm text-gray-600">Stay updated with real-time alerts</p>
          </div>
        </div>
        <button
          onClick={() => setEnabled(!enabled)}
          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
            enabled ? 'bg-emerald-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
              enabled ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {enabled && (
        <>
          <div className="space-y-3 mb-4">
            {notifications.map((notif) => {
              const Icon = getIcon(notif.type);
              return (
                <div
                  key={notif.id}
                  className={`flex items-start gap-3 p-4 rounded-lg border ${
                    notif.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    notif.type === 'bin' ? 'bg-emerald-100' :
                    notif.type === 'reward' ? 'bg-yellow-100' :
                    notif.type === 'event' ? 'bg-purple-100' : 'bg-blue-100'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      notif.type === 'bin' ? 'text-emerald-600' :
                      notif.type === 'reward' ? 'text-yellow-600' :
                      notif.type === 'event' ? 'text-purple-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm">{notif.title}</div>
                    <div className="text-sm text-gray-600">{notif.message}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {Math.floor((Date.now() - notif.time.getTime()) / 60000)} min ago
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold text-sm hover:bg-blue-200 transition-colors">
              Notification Settings
            </button>
            <button
              onClick={sendTestNotification}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-colors"
            >
              Send Test
            </button>
          </div>
        </>
      )}
    </div>
  );
}