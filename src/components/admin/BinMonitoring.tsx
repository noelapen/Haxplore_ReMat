import React, { useState, useEffect } from "react";
import {
  MapPin,
  AlertTriangle,
  Navigation,
  Filter,
  Search,
  MoreVertical,
  Trash2,
  Settings,
} from "lucide-react";

interface Bin {
  _id: string; // MongoDB id
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  acceptedItems: string[];
  fillLevel: number;
  status: "operational" | "full" | "maintenance";
  lastCollection?: string;
  itemsCollected?: number;
  temperature?: number;
  battery?: number;
}

export function BinMonitoring() {
  const [bins, setBins] = useState<Bin[]>([]);
  const [selectedBin, setSelectedBin] = useState<Bin | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // For editing bin
  const [editBin, setEditBin] = useState<Partial<Bin>>({});

  // Backend URL
  const API_URL = "http://localhost:5000/api/bins";

  // -------------------------------
  // FETCH BINS FROM MONGODB
  // -------------------------------
  const fetchBins = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();

      // Add extra fields if missing (so UI doesn't break)
      const formatted = data.map((bin: Bin) => ({
        ...bin,
        location: bin.address, // for UI display
        lastCollection: bin.lastCollection || new Date().toISOString(),
        itemsCollected: bin.itemsCollected || Math.floor(Math.random() * 500),
        temperature: bin.temperature || Math.floor(Math.random() * 15) + 20,
        battery: bin.battery || Math.floor(Math.random() * 40) + 60,
      }));

      setBins(formatted);
    } catch (err) {
      console.log("Error fetching bins:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBins();
  }, []);

  // -------------------------------
  // DELETE BIN
  // -------------------------------
  const deleteBin = async (mongoId: string) => {
    try {
      await fetch(`${API_URL}/${mongoId}`, {
        method: "DELETE",
      });

      setBins((prev) => prev.filter((b) => b._id !== mongoId));

      if (selectedBin && selectedBin._id === mongoId) {
        setSelectedBin(null);
      }
    } catch (err) {
      console.log("Error deleting bin:", err);
    }
  };

  // -------------------------------
  // UPDATE BIN
  // -------------------------------
  const updateBin = async () => {
    if (!selectedBin) return;

    try {
      const updatedData = {
        ...selectedBin,
        ...editBin,
      };

      const res = await fetch(`${API_URL}/${selectedBin._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const updatedBin = await res.json();

      setBins((prev) =>
        prev.map((b) => (b._id === updatedBin._id ? updatedBin : b))
      );

      setSelectedBin(updatedBin);
      setEditBin({});
    } catch (err) {
      console.log("Error updating bin:", err);
    }
  };

  // -------------------------------
  // FILTERING
  // -------------------------------
  const filteredBins = bins.filter((bin) => {
    const matchesStatus = filterStatus === "all" || bin.status === filterStatus;
    const matchesSearch =
      bin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bin.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // -------------------------------
  // UI HELPERS
  // -------------------------------
  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-700 border-green-200";
      case "full":
        return "bg-red-100 text-red-700 border-red-200";
      case "maintenance":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getFillColor = (level: number) => {
    if (level < 50) return "bg-green-500";
    if (level < 80) return "bg-yellow-500";
    return "bg-red-500";
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
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bins by name or ID..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
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

      {/* Loading */}
      {loading && (
        <div className="text-center text-gray-500 font-medium">
          Loading bins from MongoDB...
        </div>
      )}

      {/* Bin Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBins.map((bin) => (
          <div
            key={bin._id}
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
                    {bin.address}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">ID: {bin.id}</p>
                </div>

                <button
                  onClick={() => deleteBin(bin._id)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Bin"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>

              {/* Fill Level */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Fill Level</span>
                  <span className="font-bold text-gray-900">
                    {bin.fillLevel}%
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full ${getFillColor(
                      bin.fillLevel
                    )} transition-all`}
                    style={{ width: `${bin.fillLevel}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="p-4 bg-gray-50 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">
                  Items Collected
                </div>
                <div className="font-bold text-gray-900">
                  {bin.itemsCollected}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-1">
                  Last Collection
                </div>
                <div className="font-bold text-gray-900">
                  {bin.lastCollection
                    ? new Date(bin.lastCollection).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A"}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-1">Temperature</div>
                <div className="font-bold text-gray-900">
                  {bin.temperature}°C
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-1">Battery</div>
                <div className="font-bold text-gray-900">{bin.battery}%</div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-gray-200 flex gap-2">
              <button
                onClick={() => {
                  setSelectedBin(bin);
                  setEditBin(bin);
                }}
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
                    <div className="text-xs text-red-700">
                      Bin is nearly full
                    </div>
                  </div>
                </div>
              </div>
            )}

            {bin.battery !== undefined && bin.battery < 70 && (
              <div className="px-4 pb-4">
                <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-yellow-900">
                      Low Battery
                    </div>
                    <div className="text-xs text-yellow-700">
                      Battery at {bin.battery}%
                    </div>
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
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedBin.name}
                </h2>
                <p className="text-sm text-gray-600">{selectedBin.id}</p>
              </div>

              <button
                onClick={() => setSelectedBin(null)}
                className="text-gray-400 hover:text-gray-600 text-3xl"
              >
                &times;
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Status Overview */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Status Overview
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">
                      Current Status
                    </div>

                    <select
                      value={editBin.status}
                      onChange={(e) =>
                        setEditBin((prev) => ({
                          ...prev,
                          status: e.target.value as any,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                    >
                      <option value="operational">Operational</option>
                      <option value="full">Full</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Fill Level</div>

                    <input
                      type="number"
                      value={editBin.fillLevel}
                      onChange={(e) =>
                        setEditBin((prev) => ({
                          ...prev,
                          fillLevel: Number(e.target.value),
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                    />
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">
                      Battery Level
                    </div>

                    <input
                      type="number"
                      value={editBin.battery}
                      onChange={(e) =>
                        setEditBin((prev) => ({
                          ...prev,
                          battery: Number(e.target.value),
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                    />
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">
                      Temperature
                    </div>

                    <input
                      type="number"
                      value={editBin.temperature}
                      onChange={(e) =>
                        setEditBin((prev) => ({
                          ...prev,
                          temperature: Number(e.target.value),
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Collection Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Collection Information
                </h3>

                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Collection</span>
                    <span className="font-medium text-gray-900">
                      {selectedBin.lastCollection
                        ? new Date(
                            selectedBin.lastCollection
                          ).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Items Collected</span>
                    <span className="font-medium text-gray-900">
                      {selectedBin.itemsCollected}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  <Navigation className="w-5 h-5" />
                  Schedule Collection
                </button>

                <button
                  onClick={updateBin}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <Settings className="w-5 h-5" />
                  Save Changes
                </button>
              </div>

              <button
                onClick={() => deleteBin(selectedBin._id)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                <Trash2 className="w-5 h-5" />
                Delete Bin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}