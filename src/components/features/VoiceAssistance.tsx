import { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Navigation, Pause } from 'lucide-react';

export function VoiceAssistance() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    // Check if Web Speech API is supported
    setSupported('speechSynthesis' in window && 'webkitSpeechRecognition' in window);
  }, []);

  const startListening = () => {
    if (!supported) return;

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('Listening...');
    };

    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      handleVoiceCommand(speechResult);
    };

    recognition.onerror = () => {
      setIsListening(false);
      setTranscript('Error occurred. Please try again.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    let responseText = '';

    if (lowerCommand.includes('find bin') || lowerCommand.includes('locate bin')) {
      responseText = 'Opening bin finder. The nearest e-waste bin is 0.3 kilometers away at Green Plaza.';
    } else if (lowerCommand.includes('scan') || lowerCommand.includes('detect')) {
      responseText = 'Opening AI scanner. Please upload or take a photo of your e-waste item.';
    } else if (lowerCommand.includes('points') || lowerCommand.includes('score')) {
      responseText = 'You currently have 1,650 points. Great job recycling!';
    } else if (lowerCommand.includes('help') || lowerCommand.includes('guide')) {
      responseText = 'I can help you find bins, scan items, check your points, or answer questions about e-waste recycling.';
    } else {
      responseText = 'I heard: ' + command + '. How can I assist you with e-waste recycling?';
    }

    setResponse(responseText);
    speak(responseText);
  };

  const speak = (text: string) => {
    if (!supported) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  if (!supported) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <div className="text-center">
          <MicOff className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="font-bold text-gray-900 mb-2">Voice Assistance Not Supported</h3>
          <p className="text-sm text-gray-600">
            Your browser doesn't support voice features. Please try Chrome or Edge.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          {isListening ? (
            <Mic className="w-6 h-6 text-blue-600 animate-pulse" />
          ) : (
            <Mic className="w-6 h-6 text-blue-600" />
          )}
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Voice Assistance</h3>
          <p className="text-sm text-gray-600">Navigate with voice commands</p>
        </div>
      </div>

      {/* Voice Control Button */}
      <div className="text-center mb-6">
        <button
          onClick={isListening ? undefined : startListening}
          disabled={isListening || isSpeaking}
          className={`w-32 h-32 rounded-full flex items-center justify-center transition-all shadow-lg ${
            isListening
              ? 'bg-gradient-to-br from-red-500 to-pink-600 animate-pulse'
              : isSpeaking
              ? 'bg-gradient-to-br from-purple-500 to-indigo-600'
              : 'bg-gradient-to-br from-blue-500 to-cyan-600 hover:scale-105 active:scale-95'
          }`}
        >
          <Mic className="w-16 h-16 text-white" />
        </button>
        <p className="text-sm font-semibold text-gray-700 mt-4">
          {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Tap to speak'}
        </p>
      </div>

      {/* Transcript */}
      {transcript && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-xs text-blue-600 font-semibold mb-1">You said:</div>
          <div className="text-sm text-gray-900">{transcript}</div>
        </div>
      )}

      {/* Response */}
      {response && (
        <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200 relative">
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs text-green-600 font-semibold">Assistant:</div>
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
              >
                <Pause className="w-3 h-3" />
                Stop
              </button>
            )}
          </div>
          <div className="text-sm text-gray-900 flex items-start gap-2">
            <Volume2 className={`w-4 h-4 text-green-600 flex-shrink-0 mt-0.5 ${isSpeaking ? 'animate-pulse' : ''}`} />
            <span>{response}</span>
          </div>
        </div>
      )}

      {/* Quick Commands */}
      <div className="border-t border-gray-200 pt-4">
        <div className="text-xs font-semibold text-gray-700 mb-3">Try saying:</div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { text: '"Find bin"', icon: Navigation },
            { text: '"Scan item"', icon: Mic },
            { text: '"Check points"', icon: Volume2 },
            { text: '"Help me"', icon: Volume2 },
          ].map((cmd, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg text-xs text-gray-600"
            >
              <cmd.icon className="w-3 h-3" />
              <span>{cmd.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
