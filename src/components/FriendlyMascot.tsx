import { useState, useEffect } from 'react';
import { Trash2, Sparkles, Heart } from 'lucide-react';

interface FriendlyMascotProps {
  message?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  autoHide?: boolean;
  delay?: number;
}

export function FriendlyMascot({ 
  message = "Hi! I'm Binny! 👋", 
  position = 'bottom-right',
  autoHide = false,
  delay = 0
}: FriendlyMascotProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setShowMessage(true), 300);
      
      if (autoHide) {
        setTimeout(() => {
          setShowMessage(false);
          setTimeout(() => setIsVisible(false), 300);
        }, 5000);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [autoHide, delay]);

  if (!isVisible) return null;

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  const messagePositions = {
    'bottom-right': 'bottom-full right-0 mb-4',
    'bottom-left': 'bottom-full left-0 mb-4',
    'top-right': 'top-full right-0 mt-4',
    'top-left': 'top-full left-0 mt-4',
  };

  return (
    <div 
      className={`fixed ${positionClasses[position]} z-[65]`}
      style={{ animation: 'bounceInMascot 0.6s ease-out' }}
    >
      {/* Message Bubble */}
      {showMessage && message && (
        <div 
          className={`absolute ${messagePositions[position]} w-64`}
          style={{ animation: 'fadeInUp 0.3s ease-out' }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-4 border-2 border-emerald-200 relative">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
              <p className="text-sm text-gray-700 flex-1">{message}</p>
            </div>
            {/* Tail */}
            <div 
              className={`absolute w-4 h-4 bg-white border-emerald-200 transform rotate-45 ${
                position.includes('bottom') 
                  ? '-bottom-2 border-b-2 border-r-2' 
                  : '-top-2 border-t-2 border-l-2'
              } ${position.includes('right') ? 'right-6' : 'left-6'}`}
            />
          </div>
        </div>
      )}

      {/* Mascot Character */}
      <div className="relative">
        {/* Hearts animation */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
          <Heart 
            className="w-4 h-4 text-red-400 fill-red-400" 
            style={{ animation: 'floatHeart 2s ease-in-out infinite' }}
          />
        </div>

        {/* Main Bin Character */}
        <div 
          className="relative w-20 h-24 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-2xl shadow-2xl cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ animation: 'wiggle 3s ease-in-out infinite' }}
        >
          {/* Bin Lid */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-emerald-700 rounded-full shadow-lg" />
          
          {/* Face */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            {/* Eyes */}
            <div className="flex gap-3">
              <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-gray-800 rounded-full" style={{ animation: 'blink 4s ease-in-out infinite' }} />
              </div>
              <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-gray-800 rounded-full" style={{ animation: 'blink 4s ease-in-out infinite' }} />
              </div>
            </div>
            
            {/* Smile */}
            <div className="w-8 h-4 border-b-2 border-white rounded-full" />
          </div>

          {/* Recycle Symbol */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">♻️</span>
            </div>
          </div>

          {/* Sparkle Effect */}
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-5 h-5 text-yellow-300" style={{ animation: 'twinkle 2s ease-in-out infinite' }} />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounceInMascot {
          0% {
            opacity: 0;
            transform: translateY(100px) scale(0.5);
          }
          60% {
            opacity: 1;
            transform: translateY(-10px) scale(1.1);
          }
          80% {
            transform: translateY(5px) scale(0.95);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes wiggle {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-3deg);
          }
          75% {
            transform: rotate(3deg);
          }
        }

        @keyframes blink {
          0%, 96%, 100% {
            transform: scaleY(1);
          }
          98% {
            transform: scaleY(0.1);
          }
        }

        @keyframes floatHeart {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-30px) scale(1);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2) rotate(180deg);
          }
        }
      `}} />
    </div>
  );
}