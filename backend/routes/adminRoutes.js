/** @format */

const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const adminPlaceController = require("../controllers/adminPlaceController");
const recommendationController = require("../controllers/recommendationController");

// ============================
// 📊 Statistik & Dashboard
// ============================
router.get("/stats", adminController.getStats); // Total user/tempat/ulasan/kategori
router.get("/traffic", adminController.getTraffic); // Pengunjung 7 hari terakhir
router.get("/categories", adminController.getCategories); // Distribusi kategori (pie)
router.get("/activities", adminController.getUserActivities); // Aktivitas user (donat)
router.get("/global-summary", adminController.getGlobalSummary); // Komposisi data global

// ============================
// 🆕 Tempat Terbaru (Limit 5)
// ============================
router.get("/places/latest", adminController.getLatestPlaces);

// ============================
// 🗺️ Manajemen Tempat Wisata
// ============================
router.get("/places", adminPlaceController.getPlaces); // Semua tempat
router.get("/places-paginated", adminPlaceController.getPlacesPaginated); // Dengan pagination
router.get("/places/filter", adminPlaceController.filterPlaces); // Berdasarkan kategori/status
router.get("/places/:id", adminPlaceController.getPlaceById); // Detail tempat
router.post("/places", adminPlaceController.createPlace); // Tambah tempat
router.put("/places/:id", adminPlaceController.updatePlace); // Edit tempat
router.delete("/places/:id", adminPlaceController.deletePlace); // Hapus tempat
router.get("/search", adminPlaceController.searchPlaces); // Cari tempat via query

// ============================
// 📥 Persetujuan Rekomendasi Tempat
// ============================
router.get("/recommendations", recommendationController.getRecommendations); // Semua rekomendasi
router.get(
  "/recommendations/:id",
  recommendationController.getRecommendationById
); // Detail
router.post(
  "/recommendations/:id/approve",
  recommendationController.approveRecommendation
); // Setujui
router.post(
  "/recommendations/:id/reject",
  recommendationController.rejectRecommendation
); // Tolak

// ============================
// 👥 Manajemen Pengguna (User & Admin)
// ============================
router.get("/users", adminController.getAllUsers); // Semua pengguna
router.post("/users", adminController.createUser); // Tambah pengguna
router.put("/users/:id", adminController.updateUser); // Edit pengguna
router.delete("/users/:id", adminController.deleteUser); // Hapus pengguna
router.put("/users/:id/status", adminController.updateUserStatus); // Aktif/Nonaktif pengguna
router.post("/users/:id/reset-password", adminController.resetUserPassword); // Reset password
router.put("/profile-picture/:id", adminController.updateProfilePicture); // ✅ Update foto profil admin

// ============================
// 🔐 Login Admin
// ============================
router.post("/login", adminController.login); // Login admin

module.exports = router;
