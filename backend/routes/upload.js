/** @format */
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();

// === Pastikan folder uploads ada ===
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// === STORAGE CONFIG ===
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// =====================================
// ✅ DEFAULT /api/upload → SINGLE
// =====================================
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded." });

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.json({ url: imageUrl });
});

// =====================================
// ✅ COVER (Logo/Cover Tempat)
// =====================================
router.post("/cover", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded." });

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.json({ url: imageUrl });
});

// =====================================
// ✅ MULTIPLE SLIDER
// =====================================
router.post("/slider", upload.array("images"), (req, res) => {
  if (!req.files || req.files.length === 0)
    return res.status(400).json({ error: "No files uploaded." });

  const imageUrls = req.files.map((file) => {
    return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
  });

  res.json({ urls: imageUrls });
});

// =====================================
// ✅ PROFILE USER
// =====================================
router.post("/profile/user", upload.single("image"), (req, res) => {
  if (!req.file)
    return res.status(400).json({ error: "No profile image uploaded." });

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.json({ url: imageUrl });
});

// =====================================
// ✅ PROFILE ADMIN
// =====================================
router.post("/profile/admin", upload.single("image"), (req, res) => {
  if (!req.file)
    return res.status(400).json({ error: "No profile image uploaded." });

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.json({ url: imageUrl });
});

// =====================================
// ✅ DELETE FILE dari URL
// =====================================
router.delete("/", (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "No URL provided." });

  const filename = path.basename(url); // ambil nama file dari URL
  const filePath = path.join(uploadDir, filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("❌ Gagal hapus file:", err);
      return res.status(500).json({ error: "Gagal hapus file." });
    }
    res.json({ message: "File berhasil dihapus." });
  });
});

module.exports = router;
