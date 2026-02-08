import { useState, useEffect } from 'react';
import {
  ChevronRight,
  LayoutDashboard,
  Trash2,
  Users,
  BarChart3,
  Bell,
  Settings,
  Sparkles,
  CheckCircle,
  Map,
  TrendingUp,
  Shield,
} from 'lucide-react';

interface AdminTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  details: string[];
}

const ADMIN_TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome, Administrator! 👋',
    description: 'Your control center for managing the Smart E-Waste System.',
    icon: Shield,
    details: [
      'Monitor all smart bins in real-time',
      'Manage users and system permissions',
      'View comprehensive analytics and reports',
      'Configure alerts and notifications',
    ],
  },
  {
    id: 'dashboard',
    title: 'Dashboard Overview',
    description: 'Your central hub for system monitoring.',
    icon: LayoutDashboard,
    details: [
      'View total bins, active users, and collection stats',
      'Monitor system health and performance metrics',
      'Track daily, weekly, and monthly trends',
      'Quick access to critical alerts and issues',
    ],
  },
  {
    id: 'bin-management',
    title: 'Bin Management',
    description: 'Monitor and control all smart bins in the network.',
    icon: Trash2,
    details: [
      'View real-time fill levels and status of all bins',
      'Receive alerts when bins need collection',
      'Track bin locations on an interactive map',
      'Manage bin settings and configurations',
    ],
  },
  {
    id: 'user-management',
    title: 'User Management',
    description: 'Oversee all users in the ecosystem.',
    icon: Users,
    details: [
      'View and manage all registered users',
      'Monitor user activity and recycling stats',
      'Handle user reports and support requests',
      'Award badges and manage rewards system',
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics & Reports',
    description: 'Data-driven insights for optimization.',
    icon: BarChart3,
    details: [
      'View detailed collection and recycling metrics',
      'Track environmental impact (CO₂ saved)',
      'Generate custom reports for stakeholders',
      'Identify trends and optimize routes',
    ],
  },
  {
    id: 'alerts',
    title: 'Alerts & Notifications',
    description: 'Stay informed about system events.',
    icon: Bell,
    details: [
      'Critical alerts for bins at capacity',
      'System health and maintenance warnings',
      'User activity and milestone notifications',
      'Customizable alert preferences',
    ],
  },
  {
    id: 'settings',
    title: 'System Settings',
    description: 'Configure system-wide parameters.',
    icon: Settings,
    details: [
      'Set collection thresholds and schedules',
      'Configure point values and rewards',
      'Manage bin types and categories',
      'Update system-wide announcements',
    ],
  },
];

export function AdminTutorial({ isOpen, onClose, onComplete }: AdminTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const step = ADMIN_TUTORIAL_STEPS[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === ADMIN_TUTORIAL_STEPS.length - 1;
  const Icon = step.icon;

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (dontShowAgain) {
      localStorage.setItem('admin_tutorial_dont_show', 'true');
    }
    onClose();
  };

  const handleComplete = () => {
    if (dontShowAgain) {
      localStorage.setItem('admin_tutorial_dont_show', 'true');
    }
    onComplete();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Semi-transparent overlay */}
      <div 
        className="fixed inset-0 bg-black/40 z-[60]" 
        style={{ animation: 'fadeIn 0.3s ease-out' }} 
        onClick={handleSkip}
      />

      {/* Tutorial Content Card */}
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden z-[62]"
        style={{ 
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'slideIn 0.4s ease-out',
          maxHeight: 'calc(100vh - 100px)',
          overflowY: 'auto'
        }}
      >
        {/* Header with Skip Button */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="text-white/90 text-sm font-medium mb-1">
                Step {currentStep + 1} of {ADMIN_TUTORIAL_STEPS.length}
              </div>
              <h3 className="text-white text-2xl font-bold">
                {step.title}
              </h3>
              <p className="text-white/80 text-sm mt-1">
                {step.description}
              </p>
            </div>
            <button
              onClick={handleSkip}
              className="text-white/90 hover:text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              Skip
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Icon Display */}
          <div className="flex justify-center mb-6">
            <div 
              className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ animation: 'bounceIn 0.6s ease-out' }}
            >
              <Icon className="w-10 h-10 text-blue-600" />
            </div>
          </div>

          {/* Details list */}
          <div className="space-y-3 mb-6">
            {step.details.map((detail, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-lg border border-blue-100/50"
                style={{
                  animation: `slideInRight 0.3s ease-out ${index * 0.08}s both`,
                }}
              >
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <p className="text-gray-700 flex-1 text-sm leading-relaxed font-medium">{detail}</p>
              </div>
            ))}
          </div>

          {/* Pro Tip */}
          {currentStep === 0 && (
            <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-amber-900 text-sm mb-1">Pro Tip</div>
                  <div className="text-amber-800 text-xs">
                    You can access this tutorial anytime from the Help menu in your dashboard settings.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step indicator dots */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {ADMIN_TUTORIAL_STEPS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'w-8 bg-blue-600'
                    : index < currentStep
                    ? 'w-2 bg-blue-400'
                    : 'w-2 bg-gray-300'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handlePrevious}
              disabled={isFirstStep}
              className={`px-4 py-2.5 rounded-lg font-semibold transition-all text-sm ${
                isFirstStep
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100 active:scale-95'
              }`}
            >
              Previous
            </button>

            <span className="text-sm text-gray-500 font-medium">
              {currentStep + 1}/{ADMIN_TUTORIAL_STEPS.length}
            </span>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg active:scale-95 text-sm"
            >
              {isLastStep ? (
                <>
                  <Shield className="w-4 h-4" />
                  Get Started
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Don't show again checkbox */}
          {isLastStep && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <label className="flex items-center justify-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  Don't show this tutorial again
                </span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) translateY(0);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}} />
    </>
  );
}