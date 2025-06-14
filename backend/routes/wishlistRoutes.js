/** @format */

const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");

// Wishlist routes
router.get("/", wishlistController.getUserWishlist); // ?user_id=xx
router.post("/", wishlistController.addToWishlist);
router.delete("/:placeId", wishlistController.removeFromWishlist);

module.exports = router;
