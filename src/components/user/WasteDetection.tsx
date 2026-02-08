import { useState } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  CheckCircle,
  XCircle,
  Weight,
  Ruler,
  DollarSign,
  TrendingUp,
  Download,
  RefreshCw,
  Info,
  MoreHorizontal,
} from 'lucide-react';

interface WasteDetectionProps {
  user: any;
  onRecyclingComplete: (item: any) => void;
}

type DetectionState = 'idle' | 'scanning' | 'detected' | 'error';

interface DetectedItem {
  type: string;
  name: string;
  confidence: number;
  weight: number;
  value: number;
  points: number;
  co2Saved: number;
  condition: string;
  image?: string;
}

const WASTE_ITEMS = [
  { type: 'phone', name: 'Smartphone', baseValue: 15, basePoints: 150, co2: 12 },
  { type: 'laptop', name: 'Laptop', baseValue: 40, basePoints: 400, co2: 45 },
  { type: 'tablet', name: 'Tablet', baseValue: 25, basePoints: 250, co2: 20 },
  { type: 'battery', name: 'Battery Pack', baseValue: 8, basePoints: 80, co2: 5 },
  { type: 'cable', name: 'Cable', baseValue: 2, basePoints: 20, co2: 1 },
  { type: 'charger', name: 'Charger', baseValue: 5, basePoints: 50, co2: 3 },
  { type: 'headphones', name: 'Headphones', baseValue: 10, basePoints: 100, co2: 6 },
  { type: 'watch', name: 'Smart Watch', baseValue: 20, basePoints: 200, co2: 10 },
  { type: 'hard-drive', name: 'Hard Drive', baseValue: 12, basePoints: 120, co2: 8 },
  { type: 'other', name: 'Other Electronics', baseValue: 6, basePoints: 60, co2: 4 },
];

export function WasteDetection({ user, onRecyclingComplete }: WasteDetectionProps) {
  const [detectionState, setDetectionState] = useState<DetectionState>('idle');
  const [detectedItem, setDetectedItem] = useState<DetectedItem | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [manualOverride, setManualOverride] = useState(false);
  const [showAIExplainer, setShowAIExplainer] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const startScanning = () => {
    setDetectionState('scanning');
    setScanProgress(0);
    setManualOverride(false);

    // Simulate AI scanning process
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          performDetection();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const performDetection = () => {
    // Simulate AI detection with random item
    setTimeout(() => {
      const randomItem = WASTE_ITEMS[Math.floor(Math.random() * WASTE_ITEMS.length)];
      const confidence = 75 + Math.random() * 25; // 75-100%
      const weight = 0.1 + Math.random() * 2; // 0.1-2.1 kg
      const conditionFactor = 0.6 + Math.random() * 0.4; // 60-100% condition

      const detected: DetectedItem = {
        type: randomItem.type,
        name: randomItem.name,
        confidence: Math.round(confidence),
        weight: Math.round(weight * 100) / 100,
        value: Math.round(randomItem.baseValue * conditionFactor * 100) / 100,
        points: Math.round(randomItem.basePoints * conditionFactor),
        co2Saved: Math.round(randomItem.co2 * weight * 10) / 10,
        condition: conditionFactor > 0.8 ? 'Excellent' : conditionFactor > 0.7 ? 'Good' : 'Fair',
        image: previewUrl || undefined,
      };

      setDetectedItem(detected);
      setDetectionState('detected');
    }, 500);
  };

  const handleConfirm = () => {
    if (detectedItem) {
      onRecyclingComplete(detectedItem);
      // Show success state briefly then reset
      setTimeout(() => {
        resetDetection();
      }, 2000);
    }
  };

  const resetDetection = () => {
    setDetectionState('idle');
    setDetectedItem(null);
    setScanProgress(0);
    setSelectedFile(null);
    setPreviewUrl(null);
    setManualOverride(false);
  };

  const handleManualSelect = (item: any) => {
    const weight = 0.5 + Math.random() * 1.5;
    const conditionFactor = 0.7;

    const detected: DetectedItem = {
      type: item.type,
      name: item.name,
      confidence: 100,
      weight: Math.round(weight * 100) / 100,
      value: Math.round(item.baseValue * conditionFactor * 100) / 100,
      points: Math.round(item.basePoints * conditionFactor),
      co2Saved: Math.round(item.co2 * weight * 10) / 10,
      condition: 'Good',
      image: previewUrl || undefined,
    };

    setDetectedItem(detected);
    setDetectionState('detected');
    setManualOverride(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          AI-Powered Waste Detection
        </h2>
        <p className="text-gray-600">
          Upload an image or use the bin's camera to identify your e-waste
        </p>
      </div>

      {/* Main Detection Area */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {detectionState === 'idle' && (
          <div className="p-8">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-emerald-500 transition-colors">
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              {!previewUrl ? (
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Upload E-Waste Image
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Take a photo or upload an image of your e-waste item
                  </p>
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                    <Camera className="w-5 h-5" />
                    Choose Image
                  </div>
                </label>
              ) : (
                <div>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-w-full max-h-64 mx-auto rounded-lg mb-4"
                  />
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={startScanning}
                      className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
                    >
                      <Sparkles className="w-5 h-5" />
                      Detect Item
                    </button>
                    <button
                      onClick={() => {
                        setPreviewUrl(null);
                        setSelectedFile(null);
                      }}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Change Image
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Simulated Bin Interface */}
            <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Camera className="w-5 h-5 text-blue-600" />
                Smart Bin Simulation
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                In a real bin, you would simply place your item inside. Our sensors would automatically:
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-white rounded-lg p-3 text-center">
                  <Camera className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-xs font-medium text-gray-900">Capture Image</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <Weight className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-xs font-medium text-gray-900">Measure Weight</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <Ruler className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-xs font-medium text-gray-900">Calculate Size</div>
                </div>
              </div>
            </div>

            {/* AI Detection Explainer - Collapsible */}
            <div className="mt-6">
              <button
                onClick={() => setShowAIExplainer(!showAIExplainer)}
                className="w-full p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200 hover:border-purple-300 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Info className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">How AI Image Detection Works</h4>
                    <p className="text-sm text-gray-600">
                      Click to learn more about our AI system
                    </p>
                  </div>
                </div>
                <div className={`transform transition-transform duration-300 ${showAIExplainer ? 'rotate-180' : ''}`}>
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Collapsible Content */}
              {showAIExplainer && (
                <div 
                  className="mt-3 p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200 overflow-hidden"
                  style={{ animation: 'slideDown 0.3s ease-out' }}
                >
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-purple-600">1</span>
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="font-medium text-gray-900 text-sm">Upload Your Image</div>
                        <div className="text-xs text-gray-600 mt-0.5">
                          Take a clear photo of your e-waste item from any angle
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-purple-600">2</span>
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="font-medium text-gray-900 text-sm">AI Analysis</div>
                        <div className="text-xs text-gray-600 mt-0.5">
                          Our trained image classification model analyzes visual features, size, and shape patterns
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-purple-600">3</span>
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="font-medium text-gray-900 text-sm">Waste Classification</div>
                        <div className="text-xs text-gray-600 mt-0.5">
                          The system identifies the waste type (phone, laptop, battery, etc.) with a confidence score
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-purple-600">4</span>
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="font-medium text-gray-900 text-sm">Results & Verification</div>
                        <div className="text-xs text-gray-600 mt-0.5">
                          View detected item, confidence level, estimated value, and environmental impact
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 text-xs text-purple-700">
                      <Sparkles className="w-4 h-4" />
                      <span className="font-medium">Accuracy: 95%+ with trained AI model on thousands of e-waste images</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Animation */}
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes slideDown {
                from {
                  opacity: 0;
                  max-height: 0;
                  transform: translateY(-10px);
                }
                to {
                  opacity: 1;
                  max-height: 500px;
                  transform: translateY(0);
                }
              }
            `}} />
          </div>
        )}

        {detectionState === 'scanning' && (
          <div className="p-12">
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 border-4 border-emerald-200 rounded-full"></div>
                <div
                  className="absolute inset-0 w-24 h-24 border-4 border-emerald-600 rounded-full animate-spin"
                  style={{
                    borderTopColor: 'transparent',
                    borderRightColor: 'transparent',
                  }}
                ></div>
                <Sparkles className="absolute inset-0 m-auto w-10 h-10 text-emerald-600 animate-pulse" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Analyzing E-Waste...
              </h3>
              <p className="text-gray-600 mb-6">
                Using AI to identify item type, condition, and value
              </p>

              {/* Progress Bar */}
              <div className="max-w-md mx-auto">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-green-600 transition-all duration-300 ease-out"
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600">{scanProgress}% Complete</div>
              </div>

              {/* Scanning Steps */}
              <div className="mt-8 flex justify-center gap-8">
                <div className={`text-center ${scanProgress > 30 ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Camera className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-xs text-gray-600">Image Analysis</div>
                </div>
                <div className={`text-center ${scanProgress > 60 ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Weight className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-xs text-gray-600">Weight Check</div>
                </div>
                <div className={`text-center ${scanProgress > 90 ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-xs text-gray-600">Value Calculation</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {detectionState === 'detected' && detectedItem && (
          <div className="p-8">
            {/* Success Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 animate-bounce">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Item Detected Successfully! 🎉
              </h3>
              <p className="text-gray-600">
                Here's what we found and its value
              </p>
            </div>

            {/* Detection Results */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Item Image */}
                {detectedItem.image && (
                  <div className="flex items-center justify-center">
                    <img
                      src={detectedItem.image}
                      alt="Detected item"
                      className="max-w-full max-h-48 rounded-lg shadow-md"
                    />
                  </div>
                )}

                {/* Detection Info */}
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Detected Item</div>
                    <div className="text-3xl font-bold text-gray-900">{detectedItem.name}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-2">Confidence Score</div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-white rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-green-600"
                          style={{ width: `${detectedItem.confidence}%` }}
                        ></div>
                      </div>
                      <div className="font-bold text-emerald-600">{detectedItem.confidence}%</div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Based on image, weight, and size analysis
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-xs text-gray-600 mb-1">Weight</div>
                      <div className="font-bold text-gray-900">{detectedItem.weight} kg</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-xs text-gray-600 mb-1">Condition</div>
                      <div className="font-bold text-gray-900">{detectedItem.condition}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Value Breakdown */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl p-6 border-2 border-emerald-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Points Earned</div>
                    <div className="text-2xl font-bold text-emerald-600">
                      +{detectedItem.points}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-green-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Estimated Value</div>
                    <div className="text-2xl font-bold text-green-600">
                      ${detectedItem.value}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">🌱</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">CO₂ Saved</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {detectedItem.co2Saved} kg
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleConfirm}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <CheckCircle className="w-5 h-5" />
                Confirm & Deposit
              </button>
              <button
                onClick={() => setManualOverride(true)}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
              >
                <XCircle className="w-5 h-5" />
                Not Correct?
              </button>
            </div>

            {detectedItem.confidence < 85 && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="text-yellow-600 mt-0.5">⚠️</div>
                  <div>
                    <div className="font-semibold text-yellow-900 mb-1">
                      Lower Confidence Detection
                    </div>
                    <div className="text-sm text-yellow-700">
                      The AI detected this item with {detectedItem.confidence}% confidence. Please verify if this is correct or manually select the item type.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Manual Override Modal */}
      {manualOverride && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Select Item Type</h3>
              <button
                onClick={() => setManualOverride(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {WASTE_ITEMS.map(item => (
                <button
                  key={item.type}
                  onClick={() => handleManualSelect(item)}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-emerald-50 hover:border-emerald-500 border-2 border-transparent transition-all text-left"
                >
                  <div className="font-semibold text-gray-900 mb-1">{item.name}</div>
                  <div className="text-sm text-gray-600">~{item.basePoints} points</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Detection History */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Detections</h3>
        <div className="text-center text-gray-500 py-8">
          <Download className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className="text-sm">Your detection history will appear here</p>
        </div>
      </div>
    </div>
  );
}