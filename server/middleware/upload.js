const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ================================
// 📁 Ensure Upload Directory Exists
// ================================
const UPLOAD_DIR = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true }); // ✅ safer for nested paths
}

// ================================
// ⚙️ Multer Storage Configuration
// ================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

// ================================
// 🛡️ Upload Configuration
// ================================
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
  fileFilter: (req, file, cb) => {
    // Only allow image files
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});

// ================================
// 🧩 Export Middleware
// ================================
module.exports = upload;
