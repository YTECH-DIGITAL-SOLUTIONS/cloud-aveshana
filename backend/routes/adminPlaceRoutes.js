/** @format */

const express = require("express");
const router = express.Router();
const adminPlaceController = require("../controllers/adminPlaceController");

// GET semua tempat atau pencarian
router.get("/places", adminPlaceController.getPlaces);

// POST tambah tempat baru
router.post("/places", adminPlaceController.createPlace);

// PUT edit tempat
router.put("/places/:id", adminPlaceController.updatePlace);

// DELETE hapus tempat
router.delete("/places/:id", adminPlaceController.deletePlace);

module.exports = router;
