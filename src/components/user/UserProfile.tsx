import { useState } from 'react';
import {
  Award,
  TrendingUp,
  Leaf,
  Trophy,
  Gift,
  Download,
  History,
  Share2,
  Target,
  Zap,
  Heart,
  Star,
  Medal,
  Crown,
} from 'lucide-react';

interface UserProfileProps {
  user: any;
}

const AVAILABLE_BADGES = [
  { id: 'first', name: 'First Recycler', icon: '🎯', description: 'Complete your first recycling', unlocked: true },
  { id: 'milestone10', name: '10 Items Milestone', icon: '🔟', description: 'Recycle 10 items', unlocked: false },
  { id: 'milestone50', name: '50 Items Milestone', icon: '⭐', description: 'Recycle 50 items', unlocked: false },
  { id: 'eco-warrior', name: 'Eco Warrior', icon: '🌟', description: 'Save 50kg of CO₂', unlocked: false },
  { id: 'weekly-champion', name: 'Weekly Champion', icon: '🏆', description: 'Top recycler this week', unlocked: false },
  { id: 'phone-master', name: 'Phone Master', icon: '📱', description: 'Recycle 5 phones', unlocked: false },
  { id: 'battery-hero', name: 'Battery Hero', icon: '🔋', description: 'Recycle 10 batteries', unlocked: false },
  { id: 'early-adopter', name: 'Early Adopter', icon: '🚀', description: 'Join in the first month', unlocked: true },
];

const REWARDS = [
  { id: 1, name: '$5 Amazon Gift Card', points: 500, icon: Gift, category: 'voucher' },
  { id: 2, name: '$10 Best Buy Coupon', points: 1000, icon: Gift, category: 'voucher' },
  { id: 3, name: 'Eco-Friendly Water Bottle', points: 750, icon: Heart, category: 'product' },
  { id: 4, name: 'Bamboo Phone Case', points: 600, icon: Heart, category: 'product' },
  { id: 5, name: '15% Off Electronics', points: 400, icon: Gift, category: 'discount' },
  { id: 6, name: 'Plant a Tree', points: 300, icon: Leaf, category: 'environmental' },
  { id: 7, name: '$25 Store Credit', points: 2500, icon: Gift, category: 'voucher' },
  { id: 8, name: 'Solar Power Bank', points: 1500, icon: Heart, category: 'product' },
];

const MOCK_HISTORY = [
  { id: 1, date: '2026-02-02', item: 'Smartphone', points: 150, value: 15, co2: 12 },
  { id: 2, date: '2026-02-01', item: 'Laptop Charger', points: 50, value: 5, co2: 3 },
  { id: 3, date: '2026-01-30', item: 'Battery Pack', points: 80, value: 8, co2: 5 },
  { id: 4, date: '2026-01-28', item: 'Old Tablet', points: 200, value: 20, co2: 18 },
];

export function UserProfile({ user }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'rewards' | 'history' | 'badges'>('overview');

  const unlockedBadges = AVAILABLE_BADGES.filter(b => b.unlocked);
  const lockedBadges = AVAILABLE_BADGES.filter(b => !b.unlocked);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-8 text-white mb-6 shadow-lg">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-3xl font-bold border-4 border-white/30">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">{user.name}</h1>
              <p className="text-emerald-100">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm font-medium">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <button className="p-3 bg-white/20 backdrop-blur rounded-lg hover:bg-white/30 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-yellow-300" />
              <span className="text-sm text-emerald-100">Total Points</span>
            </div>
            <div className="text-3xl font-bold">{user.points}</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-300" />
              <span className="text-sm text-emerald-100">Items Recycled</span>
            </div>
            <div className="text-3xl font-bold">{user.totalRecycled}</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="w-5 h-5 text-green-300" />
              <span className="text-sm text-emerald-100">CO₂ Saved</span>
            </div>
            <div className="text-3xl font-bold">{user.co2Saved.toFixed(1)} kg</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'bg-emerald-50 text-emerald-600 border-b-2 border-emerald-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              activeTab === 'rewards'
                ? 'bg-emerald-50 text-emerald-600 border-b-2 border-emerald-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Rewards
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              activeTab === 'badges'
                ? 'bg-emerald-50 text-emerald-600 border-b-2 border-emerald-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Badges
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              activeTab === 'history'
                ? 'bg-emerald-50 text-emerald-600 border-b-2 border-emerald-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            History
          </button>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Environmental Impact */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Leaf className="w-6 h-6 text-green-600" />
                  Environmental Impact
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                    <div className="text-sm text-gray-600 mb-1">E-Waste Diverted</div>
                    <div className="text-2xl font-bold text-green-600">
                      {(user.totalRecycled * 0.5).toFixed(1)} kg
                    </div>
                    <div className="text-xs text-gray-500 mt-1">From landfills</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                    <div className="text-sm text-gray-600 mb-1">Water Saved</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {(user.totalRecycled * 2).toFixed(0)} L
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Clean water</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
                    <div className="text-sm text-gray-600 mb-1">Energy Saved</div>
                    <div className="text-2xl font-bold text-purple-600">
                      {(user.totalRecycled * 5).toFixed(0)} kWh
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Electricity</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
                    <div className="text-sm text-gray-600 mb-1">Trees Equivalent</div>
                    <div className="text-2xl font-bold text-orange-600">
                      {(user.totalRecycled * 0.15).toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Trees planted</div>
                  </div>
                </div>
              </div>

              {/* Progress to Next Reward */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-emerald-600" />
                  Progress to Next Reward
                </h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-semibold text-gray-900">15% Off Electronics</div>
                      <div className="text-sm text-gray-600">400 points required</div>
                    </div>
                    <Gift className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-green-600 transition-all duration-500"
                        style={{ width: `${Math.min((user.points / 400) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                      {user.points} / 400 points
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {400 - user.points > 0
                      ? `${400 - user.points} more points to unlock!`
                      : 'Reward unlocked! 🎉'}
                  </div>
                </div>
              </div>

              {/* Recent Achievements */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-6 h-6 text-yellow-600" />
                  Recent Achievements
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {unlockedBadges.slice(0, 4).map(badge => (
                    <div
                      key={badge.id}
                      className="flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-4 border border-yellow-200"
                    >
                      <div className="text-3xl">{badge.icon}</div>
                      <div>
                        <div className="font-semibold text-gray-900">{badge.name}</div>
                        <div className="text-sm text-gray-600">{badge.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Rewards Tab */}
          {activeTab === 'rewards' && (
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Available Rewards</h3>
                <p className="text-gray-600">Redeem your points for eco-friendly products and discounts</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {REWARDS.map(reward => {
                  const Icon = reward.icon;
                  const canAfford = user.points >= reward.points;
                  return (
                    <div
                      key={reward.id}
                      className={`rounded-xl p-5 border-2 transition-all ${
                        canAfford
                          ? 'bg-white border-emerald-200 hover:border-emerald-500 hover:shadow-lg'
                          : 'bg-gray-50 border-gray-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            canAfford ? 'bg-emerald-100' : 'bg-gray-200'
                          }`}
                        >
                          <Icon className={`w-6 h-6 ${canAfford ? 'text-emerald-600' : 'text-gray-400'}`} />
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-emerald-600">{reward.points}</div>
                          <div className="text-xs text-gray-500">points</div>
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{reward.name}</h4>
                      <div className="text-xs text-gray-500 capitalize mb-3">{reward.category}</div>
                      <button
                        disabled={!canAfford}
                        className={`w-full py-2 rounded-lg font-medium transition-colors ${
                          canAfford
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? 'Redeem' : `Need ${reward.points - user.points} more`}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Badges Tab */}
          {activeTab === 'badges' && (
            <div>
              {/* Unlocked Badges */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Earned Badges ({unlockedBadges.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {unlockedBadges.map(badge => (
                    <div
                      key={badge.id}
                      className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-200 text-center hover:scale-105 transition-transform"
                    >
                      <div className="text-5xl mb-3">{badge.icon}</div>
                      <div className="font-bold text-gray-900 mb-1">{badge.name}</div>
                      <div className="text-xs text-gray-600">{badge.description}</div>
                      <div className="mt-3">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          <Star className="w-3 h-3" />
                          Unlocked
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Locked Badges */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Locked Badges ({lockedBadges.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {lockedBadges.map(badge => (
                    <div
                      key={badge.id}
                      className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 text-center opacity-60"
                    >
                      <div className="text-5xl mb-3 filter grayscale">{badge.icon}</div>
                      <div className="font-bold text-gray-700 mb-1">{badge.name}</div>
                      <div className="text-xs text-gray-500">{badge.description}</div>
                      <div className="mt-3">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-medium">
                          🔒 Locked
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Recycling History</h3>
                <p className="text-gray-600">Track all your e-waste recycling activities</p>
              </div>

              <div className="space-y-3">
                {MOCK_HISTORY.map(entry => (
                  <div
                    key={entry.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{entry.item}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(entry.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-emerald-600 mb-1">+{entry.points} pts</div>
                        <div className="text-sm text-gray-600">${entry.value} value</div>
                        <div className="text-xs text-green-600">{entry.co2} kg CO₂ saved</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {MOCK_HISTORY.length === 0 && (
                <div className="text-center py-12">
                  <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">No History Yet</h3>
                  <p className="text-gray-600">Start recycling to see your activity here</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-600" />
          Weekly Leaderboard
        </h3>
        <div className="space-y-3">
          {[
            { rank: 1, name: 'Sarah Johnson', points: 1250, icon: Crown },
            { rank: 2, name: 'Mike Chen', points: 1180, icon: Medal },
            { rank: 3, name: user.name + ' (You)', points: user.points, icon: Star },
            { rank: 4, name: 'Emma Davis', points: 890, icon: Award },
            { rank: 5, name: 'Alex Kim', points: 780, icon: Zap },
          ].map(entry => {
            const Icon = entry.icon;
            const isCurrentUser = entry.name.includes('(You)');
            return (
              <div
                key={entry.rank}
                className={`flex items-center gap-4 p-4 rounded-lg ${
                  isCurrentUser
                    ? 'bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200'
                    : 'bg-gray-50'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    entry.rank === 1
                      ? 'bg-yellow-400 text-white'
                      : entry.rank === 2
                      ? 'bg-gray-300 text-white'
                      : entry.rank === 3
                      ? 'bg-orange-400 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  #{entry.rank}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{entry.name}</div>
                  <div className="text-sm text-gray-600">{entry.points} points</div>
                </div>
                <Icon className={`w-5 h-5 ${isCurrentUser ? 'text-emerald-600' : 'text-gray-400'}`} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
