import { useState } from 'react';
import { Search, Filter, MoreVertical, User, Mail, Phone, Calendar, TrendingUp, Award } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  points: number;
  itemsRecycled: number;
  status: 'active' | 'inactive';
  lastActivity: string;
}

const MOCK_USERS: UserData[] = [
  {
    id: 'USR-001',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 234 567 8901',
    joinDate: '2025-12-15',
    points: 1250,
    itemsRecycled: 28,
    status: 'active',
    lastActivity: '2026-02-03',
  },
  {
    id: 'USR-002',
    name: 'Mike Chen',
    email: 'mike.chen@email.com',
    phone: '+1 234 567 8902',
    joinDate: '2025-11-22',
    points: 1180,
    itemsRecycled: 25,
    status: 'active',
    lastActivity: '2026-02-02',
  },
  {
    id: 'USR-003',
    name: 'Emma Davis',
    email: 'emma.d@email.com',
    phone: '+1 234 567 8903',
    joinDate: '2026-01-08',
    points: 890,
    itemsRecycled: 18,
    status: 'active',
    lastActivity: '2026-02-03',
  },
  {
    id: 'USR-004',
    name: 'Alex Kim',
    email: 'alex.kim@email.com',
    phone: '+1 234 567 8904',
    joinDate: '2025-10-30',
    points: 780,
    itemsRecycled: 15,
    status: 'active',
    lastActivity: '2026-02-01',
  },
  {
    id: 'USR-005',
    name: 'John Smith',
    email: 'john.s@email.com',
    phone: '+1 234 567 8905',
    joinDate: '2026-01-20',
    points: 450,
    itemsRecycled: 9,
    status: 'active',
    lastActivity: '2026-01-28',
  },
  {
    id: 'USR-006',
    name: 'Lisa Brown',
    email: 'lisa.b@email.com',
    phone: '+1 234 567 8906',
    joinDate: '2025-09-15',
    points: 320,
    itemsRecycled: 6,
    status: 'inactive',
    lastActivity: '2026-01-15',
  },
];

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const filteredUsers = MOCK_USERS.filter(user => {
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">8,932</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">7,845</div>
          <div className="text-sm text-gray-600">Active Users</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">45</div>
          <div className="text-sm text-gray-600">New This Week</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">87%</div>
          <div className="text-sm text-gray-600">Retention Rate</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search users by name, email or ID..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">User</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Contact</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Joined</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Points</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Items</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="font-bold text-blue-600">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        {user.email}
                      </div>
                      <div className="text-xs text-gray-600 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        {user.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {new Date(user.joinDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-emerald-600">{user.points}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">{user.itemsRecycled}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-1 ${
                          user.status === 'active' ? 'bg-green-600' : 'bg-gray-600'
                        }`}
                      ></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h2>
                <p className="text-sm text-gray-600">{selectedUser.id}</p>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600">Email</div>
                      <div className="font-medium text-gray-900">{selectedUser.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600">Phone</div>
                      <div className="font-medium text-gray-900">{selectedUser.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600">Member Since</div>
                      <div className="font-medium text-gray-900">
                        {new Date(selectedUser.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Stats */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Activity Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                    <div className="text-sm text-gray-600 mb-1">Total Points</div>
                    <div className="text-2xl font-bold text-emerald-600">
                      {selectedUser.points}
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="text-sm text-gray-600 mb-1">Items Recycled</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedUser.itemsRecycled}
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <div className="text-sm text-gray-600 mb-1">Last Activity</div>
                    <div className="text-sm font-semibold text-purple-600">
                      {new Date(selectedUser.lastActivity).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <div className="text-sm text-gray-600 mb-1">Status</div>
                    <div className="text-sm font-semibold text-orange-600 capitalize">
                      {selectedUser.status}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Send Message
                </button>
                <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                  View Activity
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
