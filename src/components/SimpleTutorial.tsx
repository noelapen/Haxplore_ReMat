import { useState, useEffect } from 'react';
import {
  X,
  ChevronRight,
  MapPin,
  ScanLine,
  User,
  Award,
  Sparkles,
  Home,
  CheckCircle,
  ArrowDown,
  Bell,
} from 'lucide-react';

interface SimpleTutorialProps {
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
  targetSelector?: string;
  arrowPosition?: 'top' | 'bottom' | 'left' | 'right';
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Smart E-Waste! 👋',
    description: 'Your journey to responsible e-waste recycling starts here.',
    icon: Sparkles,
    details: [
      'Earn points for every item you recycle',
      'Find nearby e-waste bins instantly',
      'Use AI to identify and value your items',
      'Track your environmental impact in real-time',
    ],
  },
  {
    id: 'home',
    title: 'Dashboard Overview',
    description: 'Your home screen shows everything at a glance.',
    icon: Home,
    targetSelector: '[data-tutorial="home-tab"]',
    arrowPosition: 'top',
    details: [
      'View your total points and recycling stats',
      'Check recent achievements and badges',
      'See your environmental impact metrics',
      'Access quick actions to find bins or scan items',
    ],
  },
  {
    id: 'find-bins',
    title: 'Find Nearby E-Waste Bins',
    description: 'Click here to locate bins near you!',
    icon: MapPin,
    targetSelector: '[data-tutorial="finder-tab"]',
    arrowPosition: 'top',
    details: [
      'Select what you want to recycle',
      'View bins on an interactive map',
      'Check bin fill levels and status',
      'Get directions to your chosen bin',
    ],
  },
  {
    id: 'ai-scan',
    title: 'AI-Powered Waste Detection',
    description: 'Upload a photo and let AI identify your e-waste!',
    icon: ScanLine,
    targetSelector: '[data-tutorial="scan-tab"]',
    arrowPosition: 'top',
    details: [
      'Take a photo or upload an image',
      'AI analyzes and identifies the item',
      'Get instant value estimation',
      'See environmental impact details',
    ],
  },
  {
    id: 'profile',
    title: 'Your Profile & Rewards',
    description: 'Track progress and redeem rewards here!',
    icon: User,
    targetSelector: '[data-tutorial="profile-tab"]',
    arrowPosition: 'top',
    details: [
      'View complete recycling history',
      'Unlock badges for milestones',
      'Redeem points for rewards',
      'See detailed impact reports',
    ],
  },
  {
    id: 'notifications',
    title: 'Stay Updated',
    description: 'Check notifications for updates and rewards!',
    icon: Bell,
    targetSelector: '[data-tutorial="notifications"]',
    arrowPosition: 'bottom',
    details: [
      'Get notified about nearby bins',
      'Receive reward notifications',
      'Stay updated on achievements',
      'Track recycling milestones',
    ],
  },
];

export function SimpleTutorial({ isOpen, onClose, onComplete }: SimpleTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [targetPosition, setTargetPosition] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const [cardPosition, setCardPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const step = TUTORIAL_STEPS[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === TUTORIAL_STEPS.length - 1;
  const Icon = step.icon;

  useEffect(() => {
    if (!isOpen || !step.targetSelector) {
      setTargetPosition(null);
      return;
    }

    const updatePosition = () => {
      const element = document.querySelector(step.targetSelector!);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetPosition({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }
    };

    setTimeout(updatePosition, 100);
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [isOpen, step.targetSelector, currentStep]);

  useEffect(() => {
    if (targetPosition && step.targetSelector) {
      const cardWidth = 384; // max-w-md = 384px
      const cardHeight = 400; // estimated card height
      const padding = 20;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = targetPosition.top;
      let left = targetPosition.left;

      if (step.arrowPosition === 'top') {
        // Position card above the target
        top = targetPosition.top - cardHeight - padding;
        left = targetPosition.left + (targetPosition.width / 2) - (cardWidth / 2);
      } else if (step.arrowPosition === 'bottom') {
        // Position card below the target
        top = targetPosition.top + targetPosition.height + padding;
        left = targetPosition.left + (targetPosition.width / 2) - (cardWidth / 2);
      } else if (step.arrowPosition === 'left') {
        left = targetPosition.left - cardWidth - padding;
        top = targetPosition.top + (targetPosition.height / 2) - (cardHeight / 2);
      } else if (step.arrowPosition === 'right') {
        left = targetPosition.left + targetPosition.width + padding;
        top = targetPosition.top + (targetPosition.height / 2) - (cardHeight / 2);
      }

      // Keep card within viewport bounds
      if (left < padding) left = padding;
      if (left + cardWidth > viewportWidth - padding) left = viewportWidth - cardWidth - padding;
      if (top < padding) top = padding;
      if (top + cardHeight > viewportHeight - padding) top = viewportHeight - cardHeight - padding;

      setCardPosition({ top, left });
    }
  }, [targetPosition, step.arrowPosition]);

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
      localStorage.setItem('tutorial_dont_show', 'true');
    }
    onClose();
  };

  const handleComplete = () => {
    if (dontShowAgain) {
      localStorage.setItem('tutorial_dont_show', 'true');
    }
    onComplete();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Semi-transparent overlay */}
      <div className="fixed inset-0 bg-black/30 z-[60] pointer-events-none" style={{ animation: 'fadeIn 0.3s ease-out' }} />

      {/* Spotlight on target element */}
      {targetPosition && step.targetSelector && (
        <>
          {/* Highlight box */}
          <div
            className="fixed z-[61] pointer-events-none rounded-lg transition-all duration-500"
            style={{
              top: `${targetPosition.top - 8}px`,
              left: `${targetPosition.left - 8}px`,
              width: `${targetPosition.width + 16}px`,
              height: `${targetPosition.height + 16}px`,
              boxShadow: '0 0 0 4px rgba(16, 185, 129, 0.6), 0 0 0 9999px rgba(0, 0, 0, 0.4)',
              animation: 'pulseGlow 2s ease-in-out infinite',
            }}
          />

          {/* Animated Arrow */}
          <div
            className="fixed z-[61] pointer-events-none"
            style={{
              top: step.arrowPosition === 'bottom' 
                ? `${targetPosition.top + targetPosition.height + 20}px`
                : step.arrowPosition === 'top'
                ? `${targetPosition.top - 60}px`
                : `${targetPosition.top + targetPosition.height / 2}px`,
              left: step.arrowPosition === 'left'
                ? `${targetPosition.left - 60}px`
                : step.arrowPosition === 'right'
                ? `${targetPosition.left + targetPosition.width + 20}px`
                : `${targetPosition.left + targetPosition.width / 2}px`,
              animation: 'bounceArrow 1.5s ease-in-out infinite',
            }}
          >
            <ArrowDown 
              className="w-10 h-10 text-emerald-400" 
              style={{
                transform: 
                  step.arrowPosition === 'bottom' ? 'rotate(0deg)' :
                  step.arrowPosition === 'top' ? 'rotate(180deg)' :
                  step.arrowPosition === 'left' ? 'rotate(90deg)' :
                  'rotate(-90deg)'
              }}
            />
          </div>
        </>
      )}

      {/* Tutorial Content Card */}
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden z-[62]"
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
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-white/90 text-sm font-medium">
              Step {currentStep + 1} of {TUTORIAL_STEPS.length}
            </div>
            <h3 className="text-white text-xl font-bold">
              {TUTORIAL_STEPS[currentStep].title}
            </h3>
          </div>
          <button
            onClick={handleSkip}
            className="text-white/90 hover:text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            Skip
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Details list */}
          <div className="space-y-2 mb-4">
            {step.details.map((detail, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-2 bg-gradient-to-r from-gray-50 to-emerald-50/30 rounded-lg"
                style={{
                  animation: `slideInRight 0.3s ease-out ${index * 0.06}s both`,
                }}
              >
                <div className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                </div>
                <p className="text-gray-700 flex-1 text-xs leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          {/* Step indicator dots */}
          <div className="flex items-center justify-center gap-1.5 mb-4">
            {TUTORIAL_STEPS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'w-5 bg-emerald-600'
                    : index < currentStep
                    ? 'w-1.5 bg-emerald-400'
                    : 'w-1.5 bg-gray-300'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={handlePrevious}
              disabled={isFirstStep}
              className={`px-3 py-2 rounded-lg font-semibold transition-all text-xs ${
                isFirstStep
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100 active:scale-95'
              }`}
            >
              Previous
            </button>

            <span className="text-xs text-gray-500 font-medium">
              {currentStep + 1}/{TUTORIAL_STEPS.length}
            </span>

            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg active:scale-95 text-xs"
            >
              {isLastStep ? 'Got it!' : 'Next'}
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Don't show again checkbox */}
          {isLastStep && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <label className="flex items-center justify-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="w-3 h-3 text-emerald-600 border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                />
                <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">
                  Don't show this again
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
            transform: translate(-50%, -50%) scale(0.8) translateY(30px);
          }
          60% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.05) translateY(-5px);
          }
          100% {
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
            transform: translateX(-15px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.6), 0 0 0 9999px rgba(0, 0, 0, 0.4);
          }
          50% {
            box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.9), 0 0 20px 10px rgba(16, 185, 129, 0.3), 0 0 0 9999px rgba(0, 0, 0, 0.4);
          }
        }

        @keyframes bounceArrow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}} />
    </>
  );
}