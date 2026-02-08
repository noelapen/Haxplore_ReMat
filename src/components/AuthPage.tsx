import { useState } from 'react';
import { ArrowLeft, Mail, Lock, User, Phone } from 'lucide-react';

interface AuthPageProps {
  userType: 'user' | 'admin';
  onAuthSuccess: (user: any) => void;
  onBack: () => void;
}

export function AuthPage({ userType, onAuthSuccess, onBack }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (!isLogin && (!formData.name || !formData.phone)) {
      setError('Please fill in all required fields');
      return;
    }

    // Mock authentication - in real app, this would call an API
    const user = {
      id: Date.now().toString(),
      name: isLogin ? formData.email.split('@')[0] : formData.name,
      email: formData.email,
      phone: formData.phone || '',
      type: userType,
      createdAt: new Date().toISOString(),
      // Initialize user data
      points: 0,
      totalRecycled: 0,
      badges: [],
      co2Saved: 0,
    };

    onAuthSuccess(user);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const isAdmin = userType === 'admin';
  const themeColor = isAdmin ? 'blue' : 'emerald';

  return (
    <div className={`min-h-screen bg-gradient-to-br from-${themeColor}-50 via-green-50 to-teal-50 flex flex-col items-center justify-center p-4`}>
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      {/* Auth Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isAdmin ? 'Admin' : 'User'} {isLogin ? 'Login' : 'Registration'}
          </h2>
          <p className="text-gray-600">
            {isLogin ? 'Welcome back!' : 'Create your account to get started'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="+1 234 567 8900"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full bg-${themeColor}-600 text-white py-3 rounded-lg font-semibold hover:bg-${themeColor}-700 transition-colors shadow-lg hover:shadow-xl`}
            style={{
              backgroundColor: isAdmin ? '#2563eb' : '#059669',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isAdmin ? '#1d4ed8' : '#047857';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isAdmin ? '#2563eb' : '#059669';
            }}
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <span className={`font-semibold text-${themeColor}-600`}>
              {isLogin ? 'Sign Up' : 'Sign In'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}