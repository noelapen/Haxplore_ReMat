import { useState } from 'react';
import { Trophy, Users, Target, TrendingUp, Award, MapPin } from 'lucide-react';

const challenges = [
  {
    id: '1',
    title: 'Weekend Warriors',
    description: 'Recycle 10 items this weekend',
    neighborhood: 'Downtown Area',
    progress: 7,
    goal: 10,
    participants: 45,
    reward: 500,
    timeLeft: '2 days',
    status: 'active',
  },
  {
    id: '2',
    title: 'Green Streets Challenge',
    description: 'Community goal: 100 items this month',
    neighborhood: 'North District',
    progress: 73,
    goal: 100,
    participants: 128,
    reward: 1000,
    timeLeft: '12 days',
    status: 'active',
  },
  {
    id: '3',
    title: 'Battery Recycling Sprint',
    description: 'Collect 50 batteries as a community',
    neighborhood: 'East Side',
    progress: 50,
    goal: 50,
    participants: 89,
    reward: 750,
    timeLeft: 'Completed',
    status: 'completed',
  },
];

const leaderboard = [
  { rank: 1, name: 'Sarah Chen', points: 2450, items: 34, badge: '🥇' },
  { rank: 2, name: 'Mike Johnson', points: 2100, items: 29, badge: '🥈' },
  { rank: 3, name: 'Emma Davis', points: 1890, items: 26, badge: '🥉' },
  { rank: 4, name: 'You', points: 1650, items: 23, badge: '⭐' },
  { rank: 5, name: 'Alex Kim', points: 1520, items: 21, badge: '' },
];

export function CommunityChallenges() {
  const [activeTab, setActiveTab] = useState<'challenges' | 'leaderboard'>('challenges');

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <Trophy className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Community Challenges</h3>
          <p className="text-sm text-gray-600">Compete with your neighborhood</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('challenges')}
          className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
            activeTab === 'challenges'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Active Challenges
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
            activeTab === 'leaderboard'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Leaderboard
        </button>
      </div>

      {/* Challenges View */}
      {activeTab === 'challenges' && (
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className={`border-2 rounded-xl p-4 ${
                challenge.status === 'completed'
                  ? 'border-green-200 bg-green-50'
                  : 'border-purple-200 bg-purple-50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-900">{challenge.title}</h4>
                    {challenge.status === 'completed' && (
                      <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                        ✓ COMPLETED
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {challenge.neighborhood}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {challenge.participants} participants
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">{challenge.timeLeft}</div>
                  <div className="text-lg font-bold text-purple-600">+{challenge.reward} pts</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-2">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Progress</span>
                  <span className="font-semibold">
                    {challenge.progress}/{challenge.goal}
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      challenge.status === 'completed'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                        : 'bg-gradient-to-r from-purple-500 to-pink-600'
                    }`}
                    style={{ width: `${(challenge.progress / challenge.goal) * 100}%` }}
                  />
                </div>
              </div>

              <button
                disabled={challenge.status === 'completed'}
                className={`w-full py-2 rounded-lg font-semibold text-sm transition-all ${
                  challenge.status === 'completed'
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {challenge.status === 'completed' ? 'Challenge Completed' : 'Join Challenge'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Leaderboard View */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-2">
          {leaderboard.map((entry) => (
            <div
              key={entry.rank}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                entry.name === 'You'
                  ? 'border-purple-300 bg-purple-50 shadow-md'
                  : 'border-gray-200 hover:border-purple-200'
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center text-2xl">
                {entry.badge || entry.rank}
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-900">
                  {entry.name}
                  {entry.name === 'You' && (
                    <span className="ml-2 text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">
                      YOU
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600">{entry.items} items recycled</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-purple-600">{entry.points}</div>
                <div className="text-xs text-gray-500">points</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
