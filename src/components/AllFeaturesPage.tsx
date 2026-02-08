import { useState } from 'react';
import { PushNotificationsSystem } from './features/PushNotifications';
import { EducationalContent } from './features/EducationalContent';
import { SocialSharing } from './features/SocialSharing';
import { SchedulingSystem } from './features/SchedulingSystem';
import { CommunityChallenges } from './features/CommunityChallenges';
import { VoiceAssistance } from './features/VoiceAssistance';
import { Sparkles } from 'lucide-react';

export function AllFeaturesPage() {
  const sampleAchievement = {
    title: '100 Items Recycled!',
    description: 'You have reached a major milestone in your recycling journey',
    points: 500,
    badge: '🏆',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-950/30 py-8 px-4 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-bold text-purple-900 dark:text-purple-200">All Features</span>
          </div>
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4">
            Complete E-Waste Solution
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Access all advanced features designed for sustainability and convenience
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
          <div className="lg:col-span-2">
            <VoiceAssistance />
          </div>

          {/* Social Sharing Demo */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Social Sharing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Share your recycling achievements with the world!</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200">
                <div className="text-center mb-4">
                  <div className="text-5xl mb-3">{sampleAchievement.badge}</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">{sampleAchievement.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">{sampleAchievement.description}</div>
                  <div className="text-3xl font-bold text-emerald-600">+{sampleAchievement.points} Points</div>
                </div>
                <SocialSharing achievement={sampleAchievement} />
              </div>

              <div className="flex flex-col justify-center">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Why Share?</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-400">
                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                    <span>Inspire your friends to recycle more</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-400">
                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                    <span>Showcase your environmental commitment</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-400">
                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                    <span>Build a community of eco-warriors</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-400">
                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                    <span>Track your milestones publicly</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Predictive Analytics Info */}
        <div className="mt-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white">
          <h4 className="text-xl font-bold mb-3">📊 Predictive Analytics (Admin Feature)</h4>
          <p className="text-purple-100 mb-4">
            Our AI-powered system predicts bin fill times based on historical data, location patterns, 
            and usage trends to optimize collection routes and reduce unnecessary trips.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">94%</div>
              <div className="text-sm text-purple-100">Prediction Accuracy</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">35%</div>
              <div className="text-sm text-purple-100">Fuel Cost Reduction</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">48hrs</div>
              <div className="text-sm text-purple-100">Advance Prediction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}