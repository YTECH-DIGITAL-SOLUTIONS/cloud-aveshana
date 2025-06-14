/** @format */
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const app = express();

// ==================================
// 🔗 Middleware Global
// ==================================
app.use(cors());
app.use(express.json());

// ==================================
// 🖼️ Serve File Statis (Gambar Upload)
// ==================================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==================================
// 📦 Import Semua Routes
// ==================================
const authRoutes = require("./routes/authRoutes"); // Login & Register (User/Admin)
const adminRoutes = require("./routes/adminRoutes"); // Fitur Admin
const categoryRoutes = require("./routes/categoryRoutes"); // Kategori Tempat
const uploadRoutes = require("./routes/upload"); // Upload File Gambar
const userRoutes = require("./routes/userRoutes"); // Dashboard/Fitur User
const reviewRoutes = require("./routes/reviewRoutes"); // Rating & Ulasan
const contentRoutes = require("./routes/contentRoutes"); // Slider, Logo Website
const wishlistRoutes = require("./routes/wishlistRoutes"); // Wishlist Tempat

// ==================================
// 📡 Gunakan Semua Route API
// ==================================
app.use("/api/auth", authRoutes); // POST /api/auth/login, /register
app.use("/api/admin", adminRoutes); // Admin Place & Approval
app.use("/api/categories", categoryRoutes); // Tempat Kategori
app.use("/api/upload", uploadRoutes); // Upload File
app.use("/api/users", userRoutes); // Profil, Rekomendasi, dll
app.use("/api/reviews", reviewRoutes); // Ulasan
app.use("/api/users/wishlist", wishlistRoutes); // Wishlist
app.use("/api/admin/content", contentRoutes); // Slider & Logo Management

// ==================================
// ✅ Root Endpoint (Health Check)
// ==================================
app.get("/", (req, res) => {
  res.send("🚀 Bhumi Aveshana API is running!");
});

// ==================================
// 🚀 Jalankan Server
// ==================================
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
