import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import "./App.css"

function App() {
  const [text, setText] = useState('');
  const [qrColor, setQrColor] = useState('#000000'); // Default color is black
  const qrRef = useRef(null); // Reference to the QR code canvas

  // Handle text input change
  function handleChange(e) {
    setText(e.target.value);
  }

  // Handle color input change
  function handleColorChange(e) {
    setQrColor(e.target.value);
  }

  // Download QR Code as image
  function downloadQRCode() {
    const canvas = qrRef.current.querySelector('canvas'); // Get the canvas element
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); // Convert to image
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <div className="container">
      <h1 className="title">QR Code Generator</h1>

      <div className="qr-code" ref={qrRef}>
        <QRCodeCanvas value={text} fgColor={qrColor} size={256} /> {/* Pass qrColor and adjust size */}
      </div>

      <div className="input-section">
        <p>Enter Your Text Here</p>
        <input
          className="input-box"
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Enter text for QR Code"
        />

        <p>Select QR Code Color</p>
        <input
          type="color"
          value={qrColor}
          onChange={handleColorChange}
          className="color-picker"
        />

        <button
          className="download-btn"
          onClick={downloadQRCode}
          disabled={!text} // Disable button if text is empty
        >
          Download QR Code
        </button>
      </div>
    </div>
  );
}

export default App;
