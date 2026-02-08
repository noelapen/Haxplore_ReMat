import { useState } from 'react';
import { Share2, Twitter, Facebook, Linkedin, Copy, Check } from 'lucide-react';

interface SocialSharingProps {
  achievement: {
    title: string;
    description: string;
    points: number;
    badge?: string;
  };
}

export function SocialSharing({ achievement }: SocialSharingProps) {
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const shareText = `🎉 I just earned ${achievement.points} points on Smart E-Waste! ${achievement.title}\n#EWaste #Sustainability #Recycling`;
  const shareUrl = 'https://smart-ewaste.app';

  const handleCopy = () => {
    navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: achievement.title,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleNativeShare}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
      >
        <Share2 className="w-4 h-4" />
        Share Achievement
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">
                {achievement.badge || '🏆'}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{achievement.title}</h3>
              <p className="text-sm text-gray-600">{achievement.description}</p>
              <div className="text-2xl font-bold text-emerald-600 mt-2">+{achievement.points} Points</div>
            </div>

            <div className="space-y-3 mb-4">
              <button
                onClick={shareToTwitter}
                className="w-full flex items-center gap-3 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <Twitter className="w-5 h-5" />
                <span className="font-semibold">Share on Twitter</span>
              </button>

              <button
                onClick={shareToFacebook}
                className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Facebook className="w-5 h-5" />
                <span className="font-semibold">Share on Facebook</span>
              </button>

              <button
                onClick={shareToLinkedIn}
                className="w-full flex items-center gap-3 px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span className="font-semibold">Share on LinkedIn</span>
              </button>

              <button
                onClick={handleCopy}
                className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
                <span className="font-semibold">{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
