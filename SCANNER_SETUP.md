# AI Waste Scanner Component - Setup Guide

## 📦 Dependencies Installation

Run these commands in your project root:

```bash
npm install @tensorflow/tfjs @teachablemachine/image
```

Or if using yarn:

```bash
yarn add @tensorflow/tfjs @teachablemachine/image
```

## 🚀 Component Usage

The `Scanner.jsx` component is ready to use. Simply import it in your React app:

```jsx
import Scanner from './components/Scanner';

function App() {
  return (
    <div>
      <Scanner />
    </div>
  );
}
```

## ⚙️ Configuration

**Important:** Before using, update the `MODEL_URL` constant in `Scanner.jsx`:

```javascript
const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/YOUR_MODEL_ID/';
```

Replace `YOUR_MODEL_ID` with your actual Teachable Machine model ID.

## 🎯 Features

✅ Real-time webcam scanning  
✅ Continuous prediction loop using `requestAnimationFrame`  
✅ Pauses when confidence > 85% for Smartphone/Laptop  
✅ Success card display with item details  
✅ Trust layer showing live confidence percentage  
✅ High-tech laser scan overlay animation  
✅ Automatic resume functionality  

## 📝 Model Requirements

Your Teachable Machine model should have these classes:
- `Smartphone`
- `Laptop`
- `Background`

## 🔧 Troubleshooting

1. **Camera Permission**: Make sure to allow camera access when prompted
2. **Model URL**: Verify your Teachable Machine model URL is correct
3. **HTTPS**: Some browsers require HTTPS for camera access
4. **Browser Compatibility**: Works best in Chrome, Firefox, or Edge
