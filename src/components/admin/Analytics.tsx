import { BarChart3, TrendingUp, Users, Recycle, Download, Calendar } from 'lucide-react';

export function Analytics() {
  return (
    <div className="space-y-6">
      {/* Time Period Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Performance Analytics</h3>
          <p className="text-sm text-gray-600">Track trends and system performance</p>
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 3 Months</option>
            <option>Last Year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Recycle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">12,847</div>
          <div className="text-sm text-gray-600 mb-2">Total Items Recycled</div>
          <div className="text-sm text-green-600 font-medium">+18% vs last period</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">$128,450</div>
          <div className="text-sm text-gray-600 mb-2">Total Value Processed</div>
          <div className="text-sm text-green-600 font-medium">+22% vs last period</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">8,932</div>
          <div className="text-sm text-gray-600 mb-2">Active Users</div>
          <div className="text-sm text-green-600 font-medium">+12% vs last period</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">8,450 kg</div>
          <div className="text-sm text-gray-600 mb-2">CO₂ Emissions Saved</div>
          <div className="text-sm text-green-600 font-medium">+15% vs last period</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Collection Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="font-bold text-gray-900 mb-4">Daily Collections</h4>
          <div className="h-64 flex items-end justify-between gap-2">
            {[
              { day: 'Mon', value: 85 },
              { day: 'Tue', value: 92 },
              { day: 'Wed', value: 78 },
              { day: 'Thu', value: 95 },
              { day: 'Fri', value: 88 },
              { day: 'Sat', value: 72 },
              { day: 'Sun', value: 68 },
            ].map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer" style={{ height: `${item.value}%` }}>
                  <div className="text-xs text-white font-bold text-center pt-2">{item.value}</div>
                </div>
                <div className="text-xs text-gray-600 font-medium">{item.day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Item Categories */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="font-bold text-gray-900 mb-4">Items by Category</h4>
          <div className="space-y-4">
            {[
              { category: 'Phones', count: 3245, percentage: 35, color: 'bg-blue-500' },
              { category: 'Batteries', count: 2156, percentage: 24, color: 'bg-green-500' },
              { category: 'Laptops', count: 1834, percentage: 20, color: 'bg-purple-500' },
              { category: 'Cables', count: 1289, percentage: 14, color: 'bg-orange-500' },
              { category: 'Others', count: 623, percentage: 7, color: 'bg-gray-500' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.category}</span>
                  <span className="text-sm text-gray-600">{item.count} items ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full ${item.color} transition-all`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Bins */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="font-bold text-gray-900 mb-4">Top Performing Bins</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Rank</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Bin Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Location</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Items</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Value</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Trend</th>
              </tr>
            </thead>
            <tbody>
              {[
                { rank: 1, name: 'Central Mall Hub', location: 'Downtown', items: 842, value: '$8,420', trend: '+15%' },
                { rank: 2, name: 'Tech District', location: 'Tech Ave', items: 756, value: '$7,560', trend: '+22%' },
                { rank: 3, name: 'University Campus', location: 'Campus Dr', items: 693, value: '$6,930', trend: '+8%' },
                { rank: 4, name: 'Airport Terminal', location: 'Airport Way', items: 621, value: '$6,210', trend: '+18%' },
                { rank: 5, name: 'Green Park Station', location: 'Park Rd', items: 547, value: '$5,470', trend: '+12%' },
              ].map((bin) => (
                <tr key={bin.rank} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      bin.rank === 1 ? 'bg-yellow-400 text-white' :
                      bin.rank === 2 ? 'bg-gray-300 text-white' :
                      bin.rank === 3 ? 'bg-orange-400 text-white' :
                      'bg-gray-200 text-gray-700'
                    }`}>
                      {bin.rank}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900">{bin.name}</td>
                  <td className="py-3 px-4 text-gray-600">{bin.location}</td>
                  <td className="py-3 px-4 text-gray-900">{bin.items}</td>
                  <td className="py-3 px-4 font-semibold text-green-600">{bin.value}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                      <TrendingUp className="w-4 h-4" />
                      {bin.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Comparison */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h4 className="font-semibold text-gray-900 mb-4">This Month</h4>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-600">Items Collected</div>
              <div className="text-2xl font-bold text-blue-600">12,847</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Value</div>
              <div className="text-2xl font-bold text-blue-600">$128,450</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Active Bins</div>
              <div className="text-2xl font-bold text-blue-600">45</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <h4 className="font-semibold text-gray-900 mb-4">Last Month</h4>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-600">Items Collected</div>
              <div className="text-2xl font-bold text-green-600">10,892</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Value</div>
              <div className="text-2xl font-bold text-green-600">$105,280</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Active Bins</div>
              <div className="text-2xl font-bold text-green-600">43</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
          <h4 className="font-semibold text-gray-900 mb-4">Growth Rate</h4>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-600">Items</div>
              <div className="text-2xl font-bold text-purple-600">+18%</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Value</div>
              <div className="text-2xl font-bold text-purple-600">+22%</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Bins</div>
              <div className="text-2xl font-bold text-purple-600">+5%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
