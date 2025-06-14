/** @format */

const db = require("../db");

// Ambil semua ulasan milik user
exports.getUserReviews = async (req, res) => {
  const userId = req.query.user_id;
  try {
    const result = await db.query(
      `
      SELECT r.id, r.rating, r.comment, r.created_at, 
             p.name as place_name, p.image_cover as image
      FROM reviews r
      JOIN places p ON r.place_id = p.id
      WHERE r.user_id = $1
      ORDER BY r.created_at DESC
    `,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("GET reviews error:", err.message);
    res.status(500).json({ error: "Gagal mengambil ulasan." });
  }
};

// Ambil ulasan berdasarkan ID tempat
exports.getReviewsByPlace = async (req, res) => {
  const placeId = req.params.placeId;
  try {
    const result = await db.query(
      `
      SELECT r.id, u.username AS user, r.rating, r.comment, r.created_at
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.place_id = $1
      ORDER BY r.created_at DESC
      `,
      [placeId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ error: "Gagal mengambil ulasan" });
  }
};

// Tambah ulasan baru
exports.addReview = async (req, res) => {
  const { user_id, place_id, rating, comment } = req.body;
  try {
    await db.query(
      `INSERT INTO reviews (user_id, place_id, rating, comment)
       VALUES ($1, $2, $3, $4)`,
      [user_id, place_id, rating, comment]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    console.error("ADD review error:", err.message);
    res.status(500).json({ error: "Gagal menambahkan ulasan." });
  }
};

// Edit ulasan
exports.updateReview = async (req, res) => {
  const id = req.params.id;
  const { rating, comment } = req.body;
  try {
    await db.query(
      `UPDATE reviews SET rating = $1, comment = $2 WHERE id = $3`,
      [rating, comment, id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("UPDATE review error:", err.message);
    res.status(500).json({ error: "Gagal mengubah ulasan." });
  }
};

// Hapus ulasan
exports.deleteReview = async (req, res) => {
  const id = req.params.id;
  try {
    await db.query(`DELETE FROM reviews WHERE id = $1`, [id]);
    res.json({ success: true });
  } catch (err) {
    console.error("DELETE review error:", err.message);
    res.status(500).json({ error: "Gagal menghapus ulasan." });
  }
};
