import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';

// ⚙️ CONFIGURATION: Replace with your Teachable Machine model URL
const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/YOUR_MODEL_ID/';

const Scanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [webcam, setWebcam] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [detectedItem, setDetectedItem] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const animationFrameRef = useRef(null);

  // Item values mapping
  const ITEM_VALUES = {
    Smartphone: 50,
    Laptop: 100,
    Background: 0
  };

  // Initialize model and webcam
  useEffect(() => {
    const init = async () => {
      try {
        // Load the model
        const modelURL = MODEL_URL + 'model.json';
        const metadataURL = MODEL_URL + 'metadata.json';
        
        const loadedModel = await tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);
        console.log('Model loaded successfully');

        // Setup webcam
        const flip = true;
        const webcamInstance = new tmImage.Webcam(640, 480, flip);
        await webcamInstance.setup();
        await webcamInstance.play();
        
        if (videoRef.current) {
          videoRef.current.srcObject = webcamInstance.webcam;
        }

        setWebcam(webcamInstance);
        setIsScanning(true);
      } catch (error) {
        console.error('Error initializing scanner:', error);
        alert('Failed to load camera or model. Please check permissions and model URL.');
      }
    };

    init();

    // Cleanup on unmount
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (webcam) {
        webcam.stop();
      }
    };
  }, []);

  // Prediction loop using requestAnimationFrame
  useEffect(() => {
    if (!model || !webcam || !isScanning || isPaused) return;

    const predict = async () => {
      if (!webcam || !model) return;

      try {
        // Get predictions
        const predictions = await model.predict(webcam.canvas);
        
        // Find the highest confidence prediction
        const topPrediction = predictions.reduce((prev, current) => 
          (prev.probability > current.probability) ? prev : current
        );

        // Update confidence display
        const currentConfidence = Math.round(topPrediction.probability * 100);
        setConfidence(currentConfidence);

        // Check if confidence > 85% for Smartphone or Laptop
        if (
          (topPrediction.className === 'Smartphone' || topPrediction.className === 'Laptop') &&
          topPrediction.probability > 0.85
        ) {
          // Pause scanning and show success card
          setIsPaused(true);
          setDetectedItem({
            name: topPrediction.className,
            confidence: topPrediction.probability,
            value: ITEM_VALUES[topPrediction.className] || 0
          });
        } else {
          // Clear detection if confidence drops
          if (detectedItem) {
            setDetectedItem(null);
          }
        }
      } catch (error) {
        console.error('Prediction error:', error);
      }

      // Continue the loop
      animationFrameRef.current = requestAnimationFrame(predict);
    };

    // Start the prediction loop
    animationFrameRef.current = requestAnimationFrame(predict);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [model, webcam, isScanning, isPaused, detectedItem]);

  // Handle resume scanning
  const handleResume = () => {
    setDetectedItem(null);
    setIsPaused(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>AI Waste Scanner</h2>
      
      <div style={styles.videoWrapper}>
        {/* Video Feed */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={styles.video}
        />

        {/* Canvas for Teachable Machine (hidden) */}
        <canvas
          ref={canvasRef}
          style={{ display: 'none' }}
        />

        {/* Laser Scan Overlay */}
        {isScanning && !isPaused && (
          <div style={styles.scanOverlay}>
            <div style={styles.scanLine}></div>
          </div>
        )}

        {/* Success Card */}
        {detectedItem && (
          <div style={styles.successCard}>
            <div style={styles.successCardContent}>
              <h3 style={styles.successTitle}>✅ Detected: {detectedItem.name}</h3>
              <p style={styles.successValue}>Value: {detectedItem.value} Points</p>
              <p style={styles.successConfidence}>
                Confidence: {Math.round(detectedItem.confidence * 100)}%
              </p>
              <button 
                onClick={handleResume} 
                style={styles.resumeButton}
                onMouseEnter={(e) => e.target.style.background = '#008800'}
                onMouseLeave={(e) => e.target.style.background = '#00aa00'}
              >
                Scan Again
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Trust Layer - Confidence Display */}
      {isScanning && !isPaused && (
        <div style={styles.trustLayer}>
          <p style={styles.trustText}>
            Analyzing... Confidence: {confidence}%
          </p>
        </div>
      )}

      {!isScanning && (
        <p style={styles.loadingText}>Initializing camera and model...</p>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  videoWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: '640px',
    marginBottom: '20px',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  video: {
    width: '100%',
    height: 'auto',
    display: 'block',
    background: '#000',
  },
  scanOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(to right, transparent, #00ff00, transparent)',
    boxShadow: '0 0 10px #00ff00, 0 0 20px #00ff00',
    animation: 'scanAnimation 2s linear infinite',
  },
  successCard: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    zIndex: 10,
    border: '3px solid #00ff00',
    minWidth: '300px',
    textAlign: 'center',
  },
  successCardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  successTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#00aa00',
    margin: 0,
  },
  successValue: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
    margin: 0,
  },
  successConfidence: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
  },
  resumeButton: {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#fff',
    background: '#00aa00',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  resumeButtonHover: {
    background: '#008800',
  },
  trustLayer: {
    marginTop: '15px',
    padding: '12px 20px',
    background: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '6px',
    color: '#fff',
  },
  trustText: {
    margin: 0,
    fontSize: '14px',
    fontWeight: '500',
    color: '#00ff00',
    textShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
  },
  loadingText: {
    marginTop: '20px',
    color: '#666',
    fontSize: '14px',
  },
};

// Add CSS animation for scan line
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes scanAnimation {
    0% {
      top: 0;
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      top: 100%;
      opacity: 1;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Scanner;
