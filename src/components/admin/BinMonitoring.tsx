import { useState } from 'react';
import {
  MapPin,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Navigation,
  Filter,
  Search,
  MoreVertical,
  Trash2,
  Settings,
} from 'lucide-react';

interface Bin {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  fillLevel: number;
  status: 'operational' | 'full' | 'maintenance';
  lastCollection: string;
  itemsCollected: number;
  temperature: number;
  battery: number;
}

const MOCK_BINS: Bin[] = [
  {
    id: 'BIN-001',
    name: 'Central Mall Hub',
    location: '123 Main St, NY',
    lat: 40.7580,
    lng: -73.9855,
    fillLevel: 45,
    status: 'operational',
    lastCollection: '2026-02-02',
    itemsCollected: 342,
    temperature: 22,
    battery: 87,
  },
  {
    id: 'BIN-002',
    name: 'Tech District',
    location: '456 Tech Ave, NY',
    lat: 40.7614,
    lng: -73.9776,
    fillLevel: 78,
    status: 'operational',
    lastCollection: '2026-02-01',
    itemsCollected: 289,
    temperature: 24,
    battery: 92,
  },
  {
    id: 'BIN-003',
    name: 'Green Park Station',
    location: '789 Park Rd, NY',
    lat: 40.7489,
    lng: -73.9680,
    fillLevel: 23,
    status: 'operational',
    lastCollection: '2026-02-03',
    itemsCollected: 156,
    temperature: 21,
    battery: 76,
  },
  {
    id: 'BIN-004',
    name: 'University Campus',
    location: '321 Campus Dr, NY',
    lat: 40.7295,
    lng: -73.9965,
    fillLevel: 95,
    status: 'full',
    lastCollection: '2026-01-30',
    itemsCollected: 421,
    temperature: 25,
    battery: 68,
  },
  {
    id: 'BIN-005',
    name: 'Downtown Center',
    location: '555 Downtown Blvd, NY',
    lat: 40.7589,
    lng: -73.9851,
    fillLevel: 12,
    status: 'operational',
    lastCollection: '2026-02-03',
    itemsCollected: 198,
    temperature: 23,
    battery: 95,
  },
  {
    id: 'BIN-006',
    name: 'Airport Terminal',
    location: '777 Airport Way, NY',
    lat: 40.7528,
    lng: -73.9712,
    fillLevel: 88,
    status: 'full',
    lastCollection: '2026-01-31',
    itemsCollected: 512,
    temperature: 26,
    battery: 52,
  },
];

export function BinMonitoring() {
  const [selectedBin, setSelectedBin] = useState<Bin | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBins = MOCK_BINS.filter(bin => {
    const matchesStatus = filterStatus === 'all' || bin.status === filterStatus;
    const matchesSearch =
      bin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bin.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'full':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getFillColor = (level: number) => {
    if (level < 50) return 'bg-green-500';
    if (level < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search bins by name or ID..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="operational">Operational</option>
            <option value="full">Full</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bin Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBins.map(bin => (
          <div
            key={bin.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{bin.name}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                        bin.status
                      )}`}
                    >
                      {bin.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {bin.location}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">ID: {bin.id}</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Fill Level */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Fill Level</span>
                  <span className="font-bold text-gray-900">{bin.fillLevel}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full ${getFillColor(bin.fillLevel)} transition-all`}
                    style={{ width: `${bin.fillLevel}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="p-4 bg-gray-50 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Items Collected</div>
                <div className="font-bold text-gray-900">{bin.itemsCollected}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Last Collection</div>
                <div className="font-bold text-gray-900">
                  {new Date(bin.lastCollection).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Temperature</div>
                <div className="font-bold text-gray-900">{bin.temperature}°C</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Battery</div>
                <div className="font-bold text-gray-900">{bin.battery}%</div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-gray-200 flex gap-2">
              <button
                onClick={() => setSelectedBin(bin)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Settings className="w-4 h-4" />
                Manage
              </button>
              <button className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                <Navigation className="w-4 h-4" />
              </button>
            </div>

            {/* Alerts */}
            {bin.fillLevel > 85 && (
              <div className="px-4 pb-4">
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-red-900">
                      Collection Required
                    </div>
                    <div className="text-xs text-red-700">Bin is nearly full</div>
                  </div>
                </div>
              </div>
            )}

            {bin.battery < 70 && (
              <div className="px-4 pb-4">
                <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-yellow-900">Low Battery</div>
                    <div className="text-xs text-yellow-700">Battery at {bin.battery}%</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bin Details Modal */}
      {selectedBin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedBin.name}</h2>
                <p className="text-sm text-gray-600">{selectedBin.id}</p>
              </div>
              <button
                onClick={() => setSelectedBin(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Status Overview */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Status Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Current Status</div>
                    <div
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                        selectedBin.status
                      )}`}
                    >
                      {selectedBin.status}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Fill Level</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {selectedBin.fillLevel}%
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Battery Level</div>
                    <div className="text-2xl font-bold text-gray-900">{selectedBin.battery}%</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Temperature</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {selectedBin.temperature}°C
                    </div>
                  </div>
                </div>
              </div>

              {/* Collection Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Collection Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Collection</span>
                    <span className="font-medium text-gray-900">
                      {new Date(selectedBin.lastCollection).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items Collected</span>
                    <span className="font-medium text-gray-900">
                      {selectedBin.itemsCollected}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next Scheduled</span>
                    <span className="font-medium text-gray-900">Feb 5, 2026</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  <Navigation className="w-5 h-5" />
                  Schedule Collection
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
