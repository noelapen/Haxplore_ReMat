import { PushNotificationsSystem } from './features/PushNotifications';
import { EducationalContent } from './features/EducationalContent';
import { SocialSharing } from './features/SocialSharing';
import { SchedulingSystem } from './features/SchedulingSystem';
import { CommunityChallenges } from './features/CommunityChallenges';
import { VoiceAssistance } from './features/VoiceAssistance';
import { Sparkles, Zap } from 'lucide-react';

export function FeaturesShowcase() {
  const sampleAchievement = {
    title: '100 Items Recycled!',
    description: 'You've reached a major milestone in your recycling journey',
    points: 500,
    badge: '🏆',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-bold text-purple-900">Advanced Features</span>
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            Comprehensive E-Waste Solution
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the complete ecosystem with intelligent features designed for sustainability
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Push Notifications */}
          <div className="lg:col-span-2">
            <PushNotificationsSystem />
          </div>

          {/* Educational Content */}
          <div className="lg:col-span-2">
            <EducationalContent />
          </div>

          {/* Scheduling System */}
          <div>
            <SchedulingSystem />
          </div>

          {/* Community Challenges */}
          <div>
            <CommunityChallenges />
          </div>

          {/* Voice Assistance */}
          <div>
            <VoiceAssistance />
          </div>

          {/* Social Sharing Demo */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Social Sharing</h3>
                <p className="text-sm text-gray-600">Share your achievements</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200 mb-4">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{sampleAchievement.badge}</div>
                <div className="font-bold text-gray-900">{sampleAchievement.title}</div>
                <div className="text-sm text-gray-600 mb-2">{sampleAchievement.description}</div>
                <div className="text-2xl font-bold text-emerald-600">+{sampleAchievement.points} Points</div>
              </div>
            </div>

            <SocialSharing achievement={sampleAchievement} />

            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-xs text-blue-800 font-medium">
                ✨ Share your recycling milestones on Twitter, Facebook, and LinkedIn to inspire others!
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features Info */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-6 text-white">
            <h4 className="font-bold mb-2">🌙 Dark Mode</h4>
            <p className="text-sm text-emerald-100">
              Toggle available in settings - reduce eye strain with dark theme
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
            <h4 className="font-bold mb-2">📴 Offline Mode</h4>
            <p className="text-sm text-blue-100">
              Access basic features even without internet connection
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
            <h4 className="font-bold mb-2">📊 Predictive Analytics</h4>
            <p className="text-sm text-purple-100">
              AI predicts bin fill times for optimized collection routes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
