import React, { useState, useCallback, useEffect } from "react";
import Tesseract from "tesseract.js";
import './App.css'; // Ensure you style accordingly

const ImageToTextConverter = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  // Handle all image processing
  const processFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file)); // preview
      setImageFile(file); // actual file
    }
  };

  // Manual input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  // Drag-and-drop support
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Paste support
  const handlePaste = useCallback((e) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.includes("image")) {
        const file = item.getAsFile();
        processFile(file);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [handlePaste]);

  // Extract text using OCR (backend call)
  const handleExtractText = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("image", imageFile);

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setText(data.text);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Image to Text Converter</h1>

      <div
        className="upload-section"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p>📤 Drop, Upload or Paste Images</p>
        <p>Supported formats: JPG, PNG, GIF, JFIF (JPEG), HEIC, PDF</p>

        {/* If image is not previewed, show the Browse button */}
        {!image && (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="file-input"
              className="file-input"
            />
            <label htmlFor="file-input" className="file-button">
              Browse
            </label>
          </>
        )}

        {/* Display image preview if available */}
        {image && <img src={image} alt="Uploaded" className="image-preview" />}
      </div>

      <button
        className={`convert-button ${loading ? "loading" : ""}`}
        onClick={handleExtractText}
        disabled={loading}
      >
        {loading ? "Processing..." : "Convert"}
      </button>

      {text && (
        <div className="result">
          <h2>Converted Text:</h2>
          <div className="text-box">
            {text.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageToTextConverter;
