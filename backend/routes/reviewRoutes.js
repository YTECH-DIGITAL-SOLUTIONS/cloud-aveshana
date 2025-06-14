/** @format */

const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.get("/", reviewController.getUserReviews); // ?user_id=xx
router.get("/place/:placeId", reviewController.getReviewsByPlace); // by place
router.post("/", reviewController.addReview); // tambah
router.put("/:id", reviewController.updateReview); // edit
router.delete("/:id", reviewController.deleteReview); // hapus

module.exports = router;
