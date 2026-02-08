import { Recycle, Shield, ChevronRight } from 'lucide-react';

interface LandingPageProps {
  onSelectUserType: (type: 'user' | 'admin') => void;
}

export function LandingPage({ onSelectUserType }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex flex-col items-center justify-center p-4">
      {/* Logo and Header */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-600 rounded-full mb-4 shadow-lg">
          <Recycle className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Smart E-Waste Bin
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Revolutionizing e-waste disposal with AI-powered detection and rewards
        </p>
      </div>

      {/* Selection Cards */}
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* User Card */}
        <button
          onClick={() => onSelectUserType('user')}
          className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-emerald-500"
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
              <Recycle className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">I'm a User</h2>
              <p className="text-gray-600 mb-4">
                Find nearby e-waste bins, dispose items, and earn rewards
              </p>
            </div>
            <div className="flex items-center text-emerald-600 font-semibold group-hover:gap-2 transition-all">
              Continue as User
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </button>

        {/* Admin Card */}
        <button
          onClick={() => onSelectUserType('admin')}
          className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-500"
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
              <Shield className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">I'm an Admin</h2>
              <p className="text-gray-600 mb-4">
                Monitor bins, manage system, and analyze recycling data
              </p>
            </div>
            <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
              Continue as Admin
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </button>
      </div>

      {/* Features */}
      <div className="mt-16 text-center max-w-4xl">
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div className="bg-white/50 backdrop-blur rounded-lg p-4">
            <div className="font-semibold text-gray-900 mb-1">📍 Smart Location</div>
            <div className="text-gray-600">Find nearest bins instantly</div>
          </div>
          <div className="bg-white/50 backdrop-blur rounded-lg p-4">
            <div className="font-semibold text-gray-900 mb-1">🤖 AI Detection</div>
            <div className="text-gray-600">Automated waste recognition</div>
          </div>
          <div className="bg-white/50 backdrop-blur rounded-lg p-4">
            <div className="font-semibold text-gray-900 mb-1">🎁 Earn Rewards</div>
            <div className="text-gray-600">Get points for every disposal</div>
          </div>
        </div>
      </div>
    </div>
  );
}
