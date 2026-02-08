import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface MascotWelcomeProps {
  userName: string;
  onComplete: () => void;
}

export function MascotWelcome({ userName, onComplete }: MascotWelcomeProps) {
  const [stage, setStage] = useState<'entering' | 'talking' | 'ready'>('entering');

  useEffect(() => {
    // Mascot enters
    const enterTimer = setTimeout(() => {
      setStage('talking');
    }, 800);

    // Ready for interaction
    const readyTimer = setTimeout(() => {
      setStage('ready');
    }, 2000);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(readyTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[100] flex items-center justify-center overflow-hidden">
      {/* Subtle Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Sparkles */}
        <Sparkles className="absolute top-20 right-40 w-8 h-8 text-emerald-400/60" style={{ animation: 'twinkleScale 2s ease-in-out infinite' }} />
        <Sparkles className="absolute bottom-32 left-40 w-6 h-6 text-blue-400/60" style={{ animation: 'twinkleScale 2.5s ease-in-out infinite 0.5s' }} />
        <Sparkles className="absolute top-1/2 right-20 w-7 h-7 text-green-400/60" style={{ animation: 'twinkleScale 2.2s ease-in-out infinite 1s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center max-w-2xl px-6">
        {/* Giant Mascot Character */}
        <div 
          className="relative mb-8"
          style={{ 
            animation: stage === 'entering' 
              ? 'mascotEntrance 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)' 
              : 'mascotIdle 3s ease-in-out infinite'
          }}
        >
          {/* Excited Hearts */}
          {stage !== 'entering' && (
            <>
              <div className="absolute -top-16 left-1/4" style={{ animation: 'floatHeartBig 2s ease-in-out infinite' }}>
                <span className="text-6xl">❤️</span>
              </div>
              <div className="absolute -top-12 right-1/4" style={{ animation: 'floatHeartBig 2.5s ease-in-out infinite 0.5s' }}>
                <span className="text-5xl">💚</span>
              </div>
            </>
          )}

          {/* Main Bin Character - Much Larger */}
          <div className="relative w-48 h-64" style={{ perspective: '1000px' }}>
            {/* Shadow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-black/30 rounded-full blur-xl" style={{ animation: 'shadowPulse 3s ease-in-out infinite' }} />
            
            {/* 3D Bin Body with depth */}
            <div 
              className="relative w-48 h-64"
              style={{ 
                transformStyle: 'preserve-3d',
                animation: stage !== 'entering' ? 'squashStretch3D 3s ease-in-out infinite' : ''
              }}
            >
              {/* Front Face */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 rounded-3xl shadow-2xl border-4 border-emerald-600/50"
                style={{
                  transform: 'translateZ(24px)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* 3D Highlight */}
                <div className="absolute top-4 left-4 right-16 h-20 bg-white/20 rounded-full blur-xl" />
                
                {/* 3D Shadow inside */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent rounded-3xl" />
              </div>

              {/* Right Side Face (3D depth) */}
              <div 
                className="absolute top-0 right-0 w-12 h-64 bg-gradient-to-r from-emerald-700 to-emerald-900 rounded-r-3xl"
                style={{
                  transform: 'rotateY(90deg) translateX(24px)',
                  transformOrigin: 'left center',
                  transformStyle: 'preserve-3d'
                }}
              />

              {/* Left Side Face (3D depth) */}
              <div 
                className="absolute top-0 left-0 w-12 h-64 bg-gradient-to-l from-emerald-700 to-emerald-800"
                style={{
                  transform: 'rotateY(-90deg) translateX(-24px)',
                  transformOrigin: 'right center',
                  transformStyle: 'preserve-3d',
                  borderTopLeftRadius: '1.5rem',
                  borderBottomLeftRadius: '1.5rem'
                }}
              />

              {/* 3D Bin Lid - with depth */}
              <div 
                className="absolute -top-6 left-1/2 -translate-x-1/2 z-20"
                style={{ 
                  animation: stage === 'talking' ? 'lidBounce3D 0.6s ease-in-out infinite' : '',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Lid Top */}
                <div className="relative w-56 h-12 bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-900 rounded-full shadow-2xl border-4 border-emerald-900/50">
                  {/* Lid Highlight */}
                  <div className="absolute top-1 left-8 right-8 h-4 bg-white/20 rounded-full blur-md" />
                </div>
                {/* Lid Bottom (3D depth) */}
                <div 
                  className="absolute top-3 left-1/2 -translate-x-1/2 w-52 h-8 bg-emerald-900 rounded-full"
                  style={{ transform: 'translateZ(-8px)' }}
                />
              </div>
              
              {/* Face Container - on front face */}
              <div 
                className="absolute top-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
                style={{ transform: 'translateZ(30px)' }}
              >
                {/* 3D Eyes with depth */}
                <div className="flex gap-8">
                  <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Eye socket shadow */}
                    <div className="absolute inset-0 bg-black/20 rounded-full blur-md translate-y-1" />
                    {/* White part */}
                    <div 
                      className="relative w-12 h-12 bg-gradient-to-br from-white to-gray-100 rounded-full flex items-center justify-center shadow-lg border-4 border-white/50"
                      style={{ transform: 'translateZ(6px)' }}
                    >
                      {/* Pupil */}
                      <div 
                        className="w-6 h-6 bg-gradient-to-br from-gray-800 to-black rounded-full shadow-inner"
                        style={{ animation: 'eyeMove 4s ease-in-out infinite' }}
                      />
                      {/* Highlight */}
                      <div className="absolute top-1.5 right-2.5 w-3 h-3 bg-white rounded-full" />
                      <div className="absolute top-3 right-3.5 w-1.5 h-1.5 bg-white/70 rounded-full" />
                    </div>
                  </div>
                  <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Eye socket shadow */}
                    <div className="absolute inset-0 bg-black/20 rounded-full blur-md translate-y-1" />
                    {/* White part */}
                    <div 
                      className="relative w-12 h-12 bg-gradient-to-br from-white to-gray-100 rounded-full flex items-center justify-center shadow-lg border-4 border-white/50"
                      style={{ transform: 'translateZ(6px)' }}
                    >
                      {/* Pupil */}
                      <div 
                        className="w-6 h-6 bg-gradient-to-br from-gray-800 to-black rounded-full shadow-inner"
                        style={{ animation: 'eyeMove 4s ease-in-out infinite' }}
                      />
                      {/* Highlight */}
                      <div className="absolute top-1.5 right-2.5 w-3 h-3 bg-white rounded-full" />
                      <div className="absolute top-3 right-3.5 w-1.5 h-1.5 bg-white/70 rounded-full" />
                    </div>
                  </div>
                </div>
                
                {/* 3D Big Smile */}
                <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                  {/* Mouth shadow */}
                  <div className="absolute inset-0 bg-black/20 blur-md translate-y-1" />
                  <div 
                    className="relative w-24 h-14 border-b-8 border-white rounded-full shadow-inner bg-gradient-to-b from-transparent to-black/10"
                    style={{ 
                      animation: stage === 'talking' ? 'smile3D 0.6s ease-in-out infinite' : '',
                      transform: 'translateZ(6px)'
                    }}
                  />
                </div>

                {/* 3D Blush Cheeks with depth */}
                <div 
                  className="absolute top-10 -left-20 w-10 h-8 bg-pink-400/70 rounded-full blur-sm"
                  style={{ transform: 'translateZ(4px)' }}
                />
                <div 
                  className="absolute top-10 -right-20 w-10 h-8 bg-pink-400/70 rounded-full blur-sm"
                  style={{ transform: 'translateZ(4px)' }}
                />
              </div>

              {/* 3D Arms with depth */}
              <div 
                className="absolute top-36 -left-14 w-12 h-36 rounded-full shadow-xl"
                style={{ 
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
                  transform: 'rotate(-20deg) translateZ(12px)',
                  animation: stage !== 'entering' ? 'waveArm3D 1.5s ease-in-out infinite' : '',
                  transformStyle: 'preserve-3d',
                  boxShadow: 'inset -4px 0 8px rgba(0,0,0,0.3), 4px 4px 12px rgba(0,0,0,0.3)'
                }}
              >
                {/* Arm highlight */}
                <div className="absolute top-4 left-2 w-4 h-16 bg-white/20 rounded-full blur-sm" />
              </div>
              <div 
                className="absolute top-36 -right-14 w-12 h-36 rounded-full shadow-xl"
                style={{ 
                  background: 'linear-gradient(-135deg, #10b981 0%, #059669 50%, #047857 100%)',
                  transform: 'rotate(20deg) translateZ(12px)',
                  animation: stage !== 'entering' ? 'waveArm3D 1.5s ease-in-out infinite 0.75s' : '',
                  transformStyle: 'preserve-3d',
                  boxShadow: 'inset 4px 0 8px rgba(0,0,0,0.3), -4px 4px 12px rgba(0,0,0,0.3)'
                }}
              >
                {/* Arm highlight */}
                <div className="absolute top-4 right-2 w-4 h-16 bg-white/20 rounded-full blur-sm" />
              </div>

              {/* 3D Recycle Symbol with depth */}
              <div 
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
                style={{ transform: 'translateZ(28px)', transformStyle: 'preserve-3d' }}
              >
                <div className="relative w-20 h-20 bg-white/40 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg border-4 border-white/30">
                  <span className="text-5xl drop-shadow-lg" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>♻️</span>
                </div>
              </div>

              {/* Sparkles around bin - 3D positioned */}
              <div 
                className="absolute -top-4 -right-4"
                style={{ transform: 'translateZ(32px)' }}
              >
                <Sparkles className="w-10 h-10 text-yellow-300 drop-shadow-lg" style={{ animation: 'twinkleRotate 2s ease-in-out infinite' }} />
              </div>
              <div 
                className="absolute top-20 -left-6"
                style={{ transform: 'translateZ(32px)' }}
              >
                <Sparkles className="w-8 h-8 text-yellow-200 drop-shadow-lg" style={{ animation: 'twinkleRotate 2.5s ease-in-out infinite 0.5s' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Speech Bubble */}
        <div 
          className="relative bg-white rounded-3xl shadow-2xl px-8 py-6 max-w-lg mb-6"
          style={{ animation: stage !== 'entering' ? 'bubbleBounce 0.5s ease-out' : 'bubbleBounce 0.5s ease-out 0.6s both' }}
        >
          {/* Bubble Tail */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white transform rotate-45" />
          
          <div className="relative text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-3" style={{ animation: 'textPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) 1s both' }}>
              Hi {userName}! 👋
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed" style={{ animation: 'textPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) 1.2s both' }}>
              I'm <span className="font-bold text-emerald-600">Binny</span>, your friendly recycling buddy! 
              <br />
              Ready to make the world greener together? 🌱
            </p>
          </div>
        </div>

        {/* Let's Go Button */}
        {stage === 'ready' && (
          <button
            onClick={onComplete}
            className="group relative px-10 py-5 bg-white text-emerald-600 rounded-full font-bold text-2xl shadow-2xl hover:shadow-3xl transition-all hover:scale-110 active:scale-95"
            style={{ animation: 'buttonPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}
          >
            <span className="flex items-center gap-3">
              Let's Go!
              <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
            </span>
            
            {/* Button Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 opacity-0 group-hover:opacity-20 transition-opacity blur-xl" />
          </button>
        )}

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-6xl" style={{ animation: 'spinFloat 4s ease-in-out infinite' }}>
          🌟
        </div>
        <div className="absolute bottom-10 right-10 text-6xl" style={{ animation: 'spinFloat 5s ease-in-out infinite 1s' }}>
          ✨
        </div>
        <div className="absolute top-1/3 left-20 text-5xl" style={{ animation: 'spinFloat 4.5s ease-in-out infinite 0.5s' }}>
          🌿
        </div>
        <div className="absolute bottom-1/3 right-20 text-5xl" style={{ animation: 'spinFloat 5.5s ease-in-out infinite 1.5s' }}>
          ♻️
        </div>
      </div>

      {/* Cartoonish Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes mascotEntrance {
          0% {
            transform: translateY(-100vh) scale(0.5) rotate(-20deg);
            opacity: 0;
          }
          60% {
            transform: translateY(20px) scale(1.2) rotate(5deg);
            opacity: 1;
          }
          80% {
            transform: translateY(-10px) scale(0.9) rotate(-3deg);
          }
          100% {
            transform: translateY(0) scale(1) rotate(0deg);
          }
        }

        @keyframes mascotIdle {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.02);
          }
        }

        @keyframes squashStretch3D {
          0%, 100% {
            transform: scaleX(1) scaleY(1);
          }
          25% {
            transform: scaleX(1.05) scaleY(0.95);
          }
          50% {
            transform: scaleX(0.95) scaleY(1.05);
          }
          75% {
            transform: scaleX(1.02) scaleY(0.98);
          }
        }

        @keyframes waveArm3D {
          0%, 100% {
            transform: rotate(-20deg);
          }
          50% {
            transform: rotate(-40deg) translateY(-10px);
          }
        }

        @keyframes lidBounce3D {
          0%, 100% {
            transform: translateX(-50%) translateY(0) rotate(0deg);
          }
          50% {
            transform: translateX(-50%) translateY(-8px) rotate(3deg);
          }
        }

        @keyframes smile3D {
          0%, 100% {
            width: 5rem;
          }
          50% {
            width: 6rem;
          }
        }

        @keyframes eyeMove {
          0%, 90%, 100% {
            transform: translateX(0);
          }
          45% {
            transform: translateX(3px);
          }
        }

        @keyframes floatHeartBig {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-80px) scale(1.5) rotate(15deg);
          }
        }

        @keyframes bubbleBounce {
          0% {
            transform: scale(0) translateY(20px);
            opacity: 0;
          }
          60% {
            transform: scale(1.1) translateY(-5px);
            opacity: 1;
          }
          80% {
            transform: scale(0.95) translateY(2px);
          }
          100% {
            transform: scale(1) translateY(0);
          }
        }

        @keyframes textPop {
          0% {
            transform: scale(0.5) translateY(10px);
            opacity: 0;
          }
          60% {
            transform: scale(1.1) translateY(-3px);
            opacity: 1;
          }
          100% {
            transform: scale(1) translateY(0);
          }
        }

        @keyframes buttonPop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes floatCircle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) translateX(20px);
            opacity: 0.6;
          }
        }

        @keyframes twinkleScale {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes twinkleRotate {
          0%, 100% {
            transform: rotate(0deg) scale(1);
            opacity: 1;
          }
          50% {
            transform: rotate(180deg) scale(1.3);
            opacity: 0.7;
          }
        }

        @keyframes spinFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes shadowPulse {
          0%, 100% {
            transform: translateX(-50%) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateX(-50%) scale(1.2);
            opacity: 0.2;
          }
        }
      `}} />
    </div>
  );
}