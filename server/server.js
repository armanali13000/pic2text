const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

// Create 'uploads' directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Enable CORS (for frontend <-> backend communication)
const cors = require('cors');
app.use(cors());

// Upload and process image
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  const imagePath = path.join(__dirname, "uploads", req.file.filename);

  Tesseract.recognize(imagePath, "eng", {
     tessedit_char_whitelist: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ',
    logger: m => console.log(m), // optional: shows progress
  })
    .then(({ data }) => {

      let extractedText = '';

        if (data.paragraphs && data.paragraphs.length > 0) {
        extractedText = data.paragraphs.map(p => p.text.trim()).join('\n\n');
        } else if (data.text) {
        extractedText = data.text.trim(); // fallback to raw text
        } else {
        extractedText = 'No text found in image.';
        }

        
        res.json({ text: extractedText });

    //   const cleanText = paragraphs.replace(/[^\x20-\x7E\n]/g, ''); // optional: clean junk characters
    //   res.json({ text: cleanText });
    })
    .catch((err) => {
      console.error("OCR error:", err);
      res.status(500).json({ error: "Failed to extract text" });
    });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
