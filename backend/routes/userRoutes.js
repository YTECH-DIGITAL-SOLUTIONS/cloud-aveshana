/** @format */

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// 🔐 User Info
router.get("/me", authMiddleware, userController.getCurrentUser);
router.put("/update", authMiddleware, userController.updateUserProfile);

// 🖼️ Update Foto Profil User
router.put(
  "/update-profile-picture",
  authMiddleware,
  userController.updateProfilePicture
);

// 📬 Rekomendasi Tempat (per user)
router.post(
  "/recommendations",
  authMiddleware,
  userController.submitRecommendation
);
router.get(
  "/recommendations",
  authMiddleware,
  userController.getMyRecommendations
);

module.exports = router;
