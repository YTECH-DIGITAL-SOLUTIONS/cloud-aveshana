/** @format */
const express = require("express");
const router = express.Router();
const contentController = require("../controllers/contentController");

// ✅ Homepage Slider
router.get("/homepage-slider", contentController.getSliders);
router.post("/homepage-slider", contentController.createSlider);
router.put("/homepage-slider/:id", contentController.updateSlider);
router.delete("/homepage-slider/:id", contentController.deleteSlider);

// ✅ Logo Website
router.get("/website-logo", contentController.getLogo);
router.post("/website-logo", contentController.updateLogo);

module.exports = router;
