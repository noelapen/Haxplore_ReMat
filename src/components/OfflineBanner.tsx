import { WifiOff } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function OfflineBanner() {
  const { offlineMode } = useTheme();

  if (!offlineMode) return null;

  return (
    <div className="bg-orange-500 text-white py-2 px-4 text-center text-sm font-medium flex items-center justify-center gap-2">
      <WifiOff className="w-4 h-4" />
      <span>Offline Mode - Using cached data</span>
    </div>
  );
}
