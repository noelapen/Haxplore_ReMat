import { useState, useMemo } from 'react';
import {
  Smartphone,
  Laptop,
  Battery,
  Cable,
  Headphones,
  Tablet,
  Watch,
  HardDrive,
  MapPin,
  Navigation,
  Filter,
  List,
  Map as MapIcon,
  ChevronRight,
  AlertCircle,
  MoreHorizontal,
} from 'lucide-react';

interface Bin {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  acceptedItems: string[];
  fillLevel: number; // 0-100
  status: 'operational' | 'full' | 'maintenance';
  distance?: number;
}

// Mock bin data
const BINS: Bin[] = [
  {
    id: '1',
    name: 'Central Mall E-Waste Hub',
    lat: 40.7580,
    lng: -73.9855,
    address: '123 Main St, New York, NY 10001',
    acceptedItems: ['phone', 'tablet', 'laptop', 'battery', 'cable', 'charger', 'headphones', 'watch', 'other'],
    fillLevel: 45,
    status: 'operational',
  },
  {
    id: '2',
    name: 'Tech District Drop-off',
    lat: 40.7614,
    lng: -73.9776,
    address: '456 Tech Ave, New York, NY 10002',
    acceptedItems: ['phone', 'laptop', 'tablet', 'hard-drive', 'other'],
    fillLevel: 78,
    status: 'operational',
  },
  {
    id: '3',
    name: 'Green Park Recycling',
    lat: 40.7489,
    lng: -73.9680,
    address: '789 Park Rd, New York, NY 10003',
    acceptedItems: ['battery', 'cable', 'charger', 'headphones', 'other'],
    fillLevel: 23,
    status: 'operational',
  },
  {
    id: '4',
    name: 'University Campus Station',
    lat: 40.7295,
    lng: -73.9965,
    address: '321 Campus Dr, New York, NY 10004',
    acceptedItems: ['phone', 'laptop', 'tablet', 'watch', 'battery', 'other'],
    fillLevel: 95,
    status: 'full',
  },
  {
    id: '5',
    name: 'Downtown Electronics Center',
    lat: 40.7589,
    lng: -73.9851,
    address: '555 Downtown Blvd, New York, NY 10005',
    acceptedItems: ['phone', 'battery', 'cable', 'charger', 'other'],
    fillLevel: 12,
    status: 'operational',
  },
];

const WASTE_TYPES = [
  { id: 'phone', label: 'Phone', icon: Smartphone, color: 'bg-blue-500' },
  { id: 'laptop', label: 'Laptop', icon: Laptop, color: 'bg-purple-500' },
  { id: 'tablet', label: 'Tablet', icon: Tablet, color: 'bg-indigo-500' },
  { id: 'battery', label: 'Battery', icon: Battery, color: 'bg-green-500' },
  { id: 'cable', label: 'Cable', icon: Cable, color: 'bg-orange-500' },
  { id: 'charger', label: 'Charger', icon: Cable, color: 'bg-yellow-500' },
  { id: 'headphones', label: 'Headphones', icon: Headphones, color: 'bg-pink-500' },
  { id: 'watch', label: 'Watch', icon: Watch, color: 'bg-teal-500' },
  { id: 'hard-drive', label: 'Hard Drive', icon: HardDrive, color: 'bg-red-500' },
  { id: 'other', label: 'Other', icon: MoreHorizontal, color: 'bg-gray-500' },
];

export function BinFinder() {
  const [selectedWasteType, setSelectedWasteType] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list');
  const [filterOpen, setFilterOpen] = useState(false);
  const [onlyOperational, setOnlyOperational] = useState(true);
  const [maxDistance, setMaxDistance] = useState<number>(5); // km
  const [showOtherModal, setShowOtherModal] = useState(false);
  const [customItemName, setCustomItemName] = useState('');

  // Calculate distances (mock - using simple lat/lng difference)
  const binsWithDistance = useMemo(() => {
    const userLat = 40.7580;
    const userLng = -73.9855;
    
    return BINS.map(bin => {
      const distance = Math.sqrt(
        Math.pow((bin.lat - userLat) * 111, 2) +
        Math.pow((bin.lng - userLng) * 111 * Math.cos(userLat * Math.PI / 180), 2)
      );
      return { ...bin, distance };
    });
  }, []);

  // Filter bins based on selected waste type and filters
  const filteredBins = useMemo(() => {
    let filtered = binsWithDistance;

    if (selectedWasteType) {
      filtered = filtered.filter(bin =>
        bin.acceptedItems.includes(selectedWasteType)
      );
    }

    if (onlyOperational) {
      filtered = filtered.filter(bin => bin.status === 'operational');
    }

    filtered = filtered.filter(bin => bin.distance! <= maxDistance);

    return filtered.sort((a, b) => a.distance! - b.distance!);
  }, [binsWithDistance, selectedWasteType, onlyOperational, maxDistance]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 bg-green-50';
      case 'full':
        return 'text-orange-600 bg-orange-50';
      case 'maintenance':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getFillColor = (level: number) => {
    if (level < 50) return 'bg-green-500';
    if (level < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Step 1: Waste Type Selection */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What do you want to recycle?
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
          {WASTE_TYPES.map(type => {
            const Icon = type.icon;
            const isSelected = selectedWasteType === type.id;
            return (
              <button
                key={type.id}
                onClick={() =>
                  setSelectedWasteType(isSelected ? null : type.id)
                }
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50 shadow-md scale-105'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow'
                }`}
              >
                <div
                  className={`w-12 h-12 ${type.color} rounded-full flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">
                  {type.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900">
            {filteredBins.length} bins found
            {selectedWasteType && ' for ' + WASTE_TYPES.find(t => t.id === selectedWasteType)?.label}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {/* Filter Button */}
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filter</span>
          </button>

          {/* View Toggle */}
          <div className="flex bg-white border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 transition-colors ${
                viewMode === 'list'
                  ? 'bg-emerald-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 transition-colors ${
                viewMode === 'map'
                  ? 'bg-emerald-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <MapIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {filterOpen && (
        <div className="mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyOperational}
                  onChange={(e) => setOnlyOperational(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">Only show operational bins</span>
              </label>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Max Distance: {maxDistance} km
              </label>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      {viewMode === 'list' ? (
        <div className="space-y-3">
          {filteredBins.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">No bins found</h3>
              <p className="text-gray-600 text-sm">
                Try adjusting your filters or selecting a different waste type
              </p>
            </div>
          ) : (
            filteredBins.map(bin => (
              <div
                key={bin.id}
                className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{bin.name}</h4>
                    <p className="text-sm text-gray-600 flex items-start gap-1">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      {bin.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <div className="text-right">
                      <div className="font-bold text-emerald-600">
                        {bin.distance!.toFixed(1)} km
                      </div>
                      <div className="text-xs text-gray-500">away</div>
                    </div>
                  </div>
                </div>

                {/* Status and Fill Level */}
                <div className="flex items-center gap-4 mb-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      bin.status
                    )}`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current"></span>
                    {bin.status.charAt(0).toUpperCase() + bin.status.slice(1)}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Fill Level</span>
                      <span>{bin.fillLevel}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full ${getFillColor(bin.fillLevel)} transition-all`}
                        style={{ width: `${bin.fillLevel}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Accepted Items */}
                <div className="mb-3">
                  <div className="text-xs text-gray-600 mb-2">Accepts:</div>
                  <div className="flex flex-wrap gap-1">
                    {bin.acceptedItems.map(item => {
                      const wasteType = WASTE_TYPES.find(t => t.id === item);
                      return (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs text-gray-700"
                        >
                          {wasteType?.label || item}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Navigate Button */}
                <button
                  onClick={() => {
                    // In real app, would open navigation app
                    alert(`Opening navigation to ${bin.name}...`);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  Navigate to Bin
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      ) : (
        // Map View
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="relative h-[600px] bg-gray-100 flex items-center justify-center">
            {/* Mock Map */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
              {/* Map Markers */}
              {filteredBins.map((bin, index) => (
                <div
                  key={bin.id}
                  className="absolute"
                  style={{
                    left: `${30 + index * 15}%`,
                    top: `${20 + index * 12}%`,
                  }}
                >
                  <div className="relative group cursor-pointer">
                    <div className="w-10 h-10 bg-emerald-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block">
                      <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-xl">
                        <div className="font-semibold">{bin.name}</div>
                        <div className="text-gray-300">{bin.distance!.toFixed(1)} km away</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* User Location */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
              </div>
            </div>

            <div className="relative z-10 text-center p-8 bg-white/90 backdrop-blur rounded-lg shadow-lg">
              <MapIcon className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Interactive Map View</h3>
              <p className="text-sm text-gray-600">
                Showing {filteredBins.length} bins on the map
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}