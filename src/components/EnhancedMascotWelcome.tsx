import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface EnhancedMascotWelcomeProps {
  userName: string;
  onComplete: () => void;
}

export function EnhancedMascotWelcome({ userName, onComplete }: EnhancedMascotWelcomeProps) {
  const [stage, setStage] = useState<'entrance' | 'idle' | 'action' | 'ready'>('entrance');
  const [lidOpen, setLidOpen] = useState(false);
  const [itemsDropped, setItemsDropped] = useState(0);
  const [blinkEyes, setBlinkEyes] = useState(false);

  useEffect(() => {
    // Stage progression
    const entranceTimer = setTimeout(() => setStage('idle'), 1200);
    const idleTimer = setTimeout(() => setStage('action'), 2500);
    const readyTimer = setTimeout(() => setStage('ready'), 7000);

    return () => {
      clearTimeout(entranceTimer);
      clearTimeout(idleTimer);
      clearTimeout(readyTimer);
    };
  }, []);

  // Action sequence - lid opens and items drop
  useEffect(() => {
    if (stage === 'action') {
      const lidTimer = setTimeout(() => setLidOpen(true), 300);
      const item1Timer = setTimeout(() => setItemsDropped(1), 1000);
      const item2Timer = setTimeout(() => setItemsDropped(2), 1800);
      const item3Timer = setTimeout(() => setItemsDropped(3), 2600);
      const lidCloseTimer = setTimeout(() => setLidOpen(false), 3500);

      return () => {
        clearTimeout(lidTimer);
        clearTimeout(item1Timer);
        clearTimeout(item2Timer);
        clearTimeout(item3Timer);
        clearTimeout(lidCloseTimer);
      };
    }
  }, [stage]);

  // Natural blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkEyes(true);
      setTimeout(() => setBlinkEyes(false), 150);
    }, 3500);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-green-50/30 to-blue-50/20 backdrop-blur-sm z-[100] flex items-center justify-center overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-400 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-32 w-40 h-40 bg-yellow-300 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-emerald-300 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center max-w-3xl px-6">
        
        {/* Character Container */}
        <div 
          className="relative mb-6"
          style={{ 
            animation: stage === 'entrance' 
              ? 'smoothEntrance 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)' 
              : stage === 'idle'
              ? 'gentleBreathing 4s ease-in-out infinite'
              : stage === 'action'
              ? 'excitedBounce 0.5s ease-in-out'
              : 'gentleBreathing 4s ease-in-out infinite'
          }}
        >
          {/* Waste Items Floating Down */}
          {stage === 'action' && itemsDropped >= 1 && (
            <div 
              className="absolute -top-20 left-1/2 -translate-x-1/2"
              style={{ animation: 'floatDown 1.2s ease-in forwards' }}
            >
              <div className="w-12 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg transform rotate-12">
                <div className="absolute top-2 left-2 w-8 h-2 bg-white/40 rounded-full" />
              </div>
            </div>
          )}
          
          {itemsDropped >= 2 && (
            <div 
              className="absolute -top-20 left-1/2 -translate-x-1/2"
              style={{ animation: 'floatDown 1.2s ease-in forwards', animationDelay: '0.8s' }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-500 rounded-full shadow-lg">
                <div className="absolute top-1 left-2 w-6 h-2 bg-white/40 rounded-full" />
              </div>
            </div>
          )}
          
          {itemsDropped >= 3 && (
            <div 
              className="absolute -top-20 left-1/2 -translate-x-1/2"
              style={{ animation: 'floatDown 1.2s ease-in forwards', animationDelay: '1.6s' }}
            >
              <div className="w-11 h-14 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg shadow-lg transform -rotate-6">
                <div className="absolute top-2 left-2 w-7 h-2 bg-white/40 rounded-full" />
              </div>
            </div>
          )}

          {/* Main Bin Character - Soft 3D Style - NORMAL SIZE */}
          <div className="relative">
            {/* Ground Shadow */}
            <div 
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-8 bg-black/10 rounded-full blur-xl"
              style={{ animation: 'shadowPulse 4s ease-in-out infinite' }}
            />

            {/* Bin Body Container */}
            <div className="relative w-64 h-80">
              
              {/* Animated Arm - Left (Pointing Up during action) */}
              <div 
                className="absolute top-32 -left-16 z-20"
                style={{ 
                  animation: stage === 'action' 
                    ? 'pointUpLeft 0.8s ease-out forwards' 
                    : stage === 'idle' || stage === 'ready'
                    ? 'gentleSwayLeft 4s ease-in-out infinite'
                    : '',
                  transformOrigin: 'top right'
                }}
              >
                {/* Arm */}
                <div className="w-10 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full shadow-xl">
                  <div className="absolute top-2 left-1 w-4 h-12 bg-white/25 rounded-full blur-sm" />
                </div>
                {/* Glove */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-2xl shadow-lg border-4 border-yellow-200">
                  <div className="absolute top-1 left-2 w-8 h-3 bg-white/30 rounded-full blur-sm" />
                  {/* Fingers */}
                  <div className="absolute -top-1 left-2 w-3 h-4 bg-yellow-400 rounded-t-full" />
                  <div className="absolute -top-1 left-5 w-3 h-5 bg-yellow-400 rounded-t-full" />
                  <div className="absolute -top-1 right-5 w-3 h-4 bg-yellow-400 rounded-t-full" />
                </div>
              </div>

              {/* Animated Arm - Right */}
              <div 
                className="absolute top-32 -right-16 z-20"
                style={{ 
                  animation: stage === 'idle' || stage === 'ready'
                    ? 'gentleSwayRight 4s ease-in-out infinite 0.5s'
                    : '',
                  transformOrigin: 'top left'
                }}
              >
                {/* Arm */}
                <div className="w-10 h-24 bg-gradient-to-bl from-emerald-400 to-emerald-600 rounded-full shadow-xl">
                  <div className="absolute top-2 right-1 w-4 h-12 bg-white/25 rounded-full blur-sm" />
                </div>
                {/* Glove */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-bl from-yellow-300 to-yellow-500 rounded-2xl shadow-lg border-4 border-yellow-200">
                  <div className="absolute top-1 right-2 w-8 h-3 bg-white/30 rounded-full blur-sm" />
                  {/* Fingers */}
                  <div className="absolute -top-1 left-2 w-3 h-4 bg-yellow-400 rounded-t-full" />
                  <div className="absolute -top-1 left-5 w-3 h-4 bg-yellow-400 rounded-t-full" />
                  <div className="absolute -top-1 right-4 w-3 h-5 bg-yellow-400 rounded-t-full" />
                </div>
              </div>

              {/* Main Bin Body - Soft 3D with Rounded Edges */}
              <div className="absolute inset-x-8 top-0 bottom-16">
                
                {/* Lid - Animated Open/Close */}
                <div 
                  className="absolute -top-8 left-1/2 -translate-x-1/2 w-56 h-16 z-30 transition-all duration-700 ease-out"
                  style={{ 
                    transform: lidOpen 
                      ? 'translateX(-50%) translateY(-20px) rotateX(-25deg)' 
                      : 'translateX(-50%) translateY(0) rotateX(0)',
                    transformOrigin: 'bottom center',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Lid Top */}
                  <div className="relative w-full h-full bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-3xl shadow-2xl">
                    {/* Handle */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full shadow-lg" />
                    {/* Highlight */}
                    <div className="absolute top-2 left-8 right-8 h-6 bg-white/25 rounded-full blur-md" />
                  </div>
                </div>

                {/* Bin Body - Main Container */}
                <div className="relative w-full h-full bg-gradient-to-br from-green-300 via-emerald-400 to-green-500 rounded-[3rem] shadow-2xl overflow-hidden">
                  
                  {/* Top Inner Shadow */}
                  <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/15 to-transparent rounded-t-[3rem]" />
                  
                  {/* Bottom Inner Shadow */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent rounded-b-[3rem]" />
                  
                  {/* Left Highlight */}
                  <div className="absolute top-12 left-4 w-12 h-48 bg-white/20 rounded-full blur-2xl" />
                  
                  {/* Side Shadow (Right) */}
                  <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-emerald-700/40 to-transparent rounded-r-[3rem]" />

                  {/* Face Container */}
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6">
                    
                    {/* Eyes */}
                    <div className="flex gap-10">
                      {/* Left Eye */}
                      <div className="relative">
                        <div 
                          className="w-16 h-16 bg-white rounded-full shadow-inner flex items-center justify-center transition-all duration-150"
                          style={{ 
                            transform: blinkEyes ? 'scaleY(0.1)' : 'scaleY(1)',
                            height: blinkEyes ? '4px' : '4rem'
                          }}
                        >
                          {!blinkEyes && (
                            <>
                              <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-black rounded-full shadow-lg" />
                              <div className="absolute top-3 right-4 w-4 h-4 bg-white rounded-full" />
                              <div className="absolute top-5 right-5 w-2 h-2 bg-white/60 rounded-full" />
                            </>
                          )}
                        </div>
                      </div>
                      
                      {/* Right Eye */}
                      <div className="relative">
                        <div 
                          className="w-16 h-16 bg-white rounded-full shadow-inner flex items-center justify-center transition-all duration-150"
                          style={{ 
                            transform: blinkEyes ? 'scaleY(0.1)' : 'scaleY(1)',
                            height: blinkEyes ? '4px' : '4rem'
                          }}
                        >
                          {!blinkEyes && (
                            <>
                              <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-black rounded-full shadow-lg" />
                              <div className="absolute top-3 right-4 w-4 h-4 bg-white rounded-full" />
                              <div className="absolute top-5 right-5 w-2 h-2 bg-white/60 rounded-full" />
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Smile */}
                    <div className="relative">
                      <div 
                        className="w-32 h-20 border-b-[6px] border-white rounded-full transition-all duration-500"
                        style={{ 
                          width: stage === 'ready' ? '9rem' : '8rem',
                          borderBottomWidth: stage === 'ready' ? '8px' : '6px'
                        }}
                      />
                      {/* Blush Cheeks */}
                      <div className="absolute -left-20 top-4 w-12 h-8 bg-pink-300/60 rounded-full blur-md" />
                      <div className="absolute -right-20 top-4 w-12 h-8 bg-pink-300/60 rounded-full blur-md" />
                    </div>
                  </div>

                  {/* Recycling Symbol with Glow Effect */}
                  <div 
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    style={{ 
                      animation: stage === 'ready' ? 'glowPulse 2s ease-in-out infinite' : ''
                    }}
                  >
                    <div className="relative">
                      <div className="w-24 h-24 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-6xl filter drop-shadow-lg">♻️</span>
                      </div>
                      {stage === 'ready' && (
                        <div className="absolute inset-0 bg-emerald-400/40 rounded-full blur-xl animate-ping" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Wheels at Bottom */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-28 z-10">
                {/* Left Wheel */}
                <div className="relative w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full shadow-xl">
                  <div className="absolute inset-2 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full" />
                  <div className="absolute top-1 left-2 w-6 h-6 bg-white/20 rounded-full blur-sm" />
                </div>
                {/* Right Wheel */}
                <div className="relative w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full shadow-xl">
                  <div className="absolute inset-2 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full" />
                  <div className="absolute top-1 left-2 w-6 h-6 bg-white/20 rounded-full blur-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Speech Bubble - Enhanced with Gradient Border */}
        <div 
          className="relative bg-gradient-to-br from-white via-green-50/30 to-emerald-50/40 rounded-[2.5rem] shadow-2xl px-12 py-10 max-w-2xl mb-8 border-4 border-white/60 backdrop-blur-sm"
          style={{ animation: 'bubbleSlideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 1s both' }}
        >
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-emerald-400/20 via-green-300/20 to-teal-400/20 -z-10 blur-xl" />
          
          {/* Bubble Tail */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/40 transform rotate-45 rounded-tl-xl shadow-lg" />
          
          {/* Decorative Corner Accents */}
          <div className="absolute top-4 left-4 w-3 h-3 bg-emerald-400 rounded-full opacity-60" />
          <div className="absolute top-6 left-6 w-2 h-2 bg-green-400 rounded-full opacity-40" />
          <div className="absolute top-4 right-4 w-3 h-3 bg-teal-400 rounded-full opacity-60" />
          <div className="absolute top-6 right-6 w-2 h-2 bg-emerald-400 rounded-full opacity-40" />
          
          <div className="relative text-center">
            <h1 
              className="text-4xl font-black mb-4 leading-tight"
              style={{ 
                animation: 'textPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) 1s both',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 40%, #047857 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 2px 8px rgba(16, 185, 129, 0.3))'
              }}
            >
              Hi {userName}! 👋
            </h1>
            <div 
              className="bg-gradient-to-r from-emerald-100 via-green-50 to-teal-100 rounded-2xl px-6 py-4 mb-3 shadow-inner"
              style={{ animation: 'textPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) 1.2s both' }}
            >
              <p className="text-xl text-gray-700 leading-relaxed font-semibold">
                I'm <span className="font-black text-2xl text-transparent bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text">Binny</span>, your friendly recycling companion! 
              </p>
            </div>
            <p 
              className="text-lg text-gray-600 font-medium flex items-center justify-center gap-2"
              style={{ animation: 'textPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) 1.4s both' }}
            >
              <span className="text-2xl">🌱</span>
              Let's make the world greener together!
              <span className="text-2xl">✨</span>
            </p>
          </div>
        </div>

        {/* Let's Go Button */}
        {stage === 'ready' && (
          <button
            onClick={onComplete}
            className="group relative px-12 py-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-full font-bold text-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ animation: 'buttonBounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          >
            <span className="flex items-center gap-4">
              Let's Go!
              <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
            
            {/* Button Glow */}
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity blur-xl" />
          </button>
        )}

        {/* Decorative Floating Elements */}
        <div className="absolute top-16 left-16 opacity-40" style={{ animation: 'gentleFloat 5s ease-in-out infinite' }}>
          <div className="text-6xl">🌿</div>
        </div>
        <div className="absolute top-32 right-20 opacity-40" style={{ animation: 'gentleFloat 6s ease-in-out infinite 1s' }}>
          <div className="text-5xl">♻️</div>
        </div>
        <div className="absolute bottom-32 left-24 opacity-40" style={{ animation: 'gentleFloat 5.5s ease-in-out infinite 2s' }}>
          <div className="text-5xl">🌍</div>
        </div>
        <div className="absolute bottom-24 right-16 opacity-40" style={{ animation: 'gentleFloat 6.5s ease-in-out infinite 0.5s' }}>
          <div className="text-6xl">✨</div>
        </div>
      </div>

      {/* Smooth Professional Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes smoothEntrance {
          0% {
            transform: translateY(100px) scale(0.8);
            opacity: 0;
          }
          60% {
            transform: translateY(-10px) scale(1.05);
            opacity: 1;
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }

        @keyframes gentleBreathing {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.01);
          }
        }

        @keyframes excitedBounce {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.03);
          }
        }

        @keyframes pointUpLeft {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-110deg) translateX(-10px);
          }
        }

        @keyframes gentleSwayLeft {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-5deg);
          }
        }

        @keyframes gentleSwayRight {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(5deg);
          }
        }

        @keyframes floatDown {
          0% {
            transform: translateY(0) translateX(-50%) scale(0) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 1;
            transform: translateY(20px) translateX(-50%) scale(1) rotate(5deg);
          }
          100% {
            transform: translateY(280px) translateX(-50%) scale(0.8) rotate(15deg);
            opacity: 0;
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.5));
            transform: scale(1);
          }
          50% {
            filter: drop-shadow(0 0 25px rgba(16, 185, 129, 0.8));
            transform: scale(1.05);
          }
        }

        @keyframes bubbleSlideUp {
          0% {
            transform: translateY(50px) scale(0.9);
            opacity: 0;
          }
          60% {
            transform: translateY(-5px) scale(1.02);
            opacity: 1;
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }

        @keyframes buttonBounceIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          60% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes shadowPulse {
          0%, 100% {
            transform: translateX(-50%) scale(1);
            opacity: 0.1;
          }
          50% {
            transform: translateX(-50%) scale(1.1);
            opacity: 0.15;
          }
        }

        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes textPop {
          0% {
            transform: translateY(10px) scale(0.9);
            opacity: 0;
          }
          60% {
            transform: translateY(-5px) scale(1.02);
            opacity: 1;
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }
      `}} />
    </div>
  );
}