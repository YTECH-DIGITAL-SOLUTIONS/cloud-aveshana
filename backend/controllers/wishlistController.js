/** @format */

const pool = require("../db");

// Ambil semua wishlist milik user tertentu
exports.getUserWishlist = async (req, res) => {
  const userId = req.user?.id || req.query.user_id; // dari middleware auth atau query param

  try {
    const result = await pool.query(
      `SELECT w.id, p.id as place_id, p.name, p.image_cover as image, p.location, c.name as category
       FROM wishlist w
       JOIN places p ON w.place_id = p.id
       JOIN categories c ON p.category = c.id
       WHERE w.user_id = $1
       ORDER BY w.created_at DESC`,
      [userId]
    );

    res.json(
      result.rows.map((row) => ({
        id: row.place_id,
        name: row.name,
        image: row.image,
        location: row.location,
        category: row.category,
      }))
    );
  } catch (err) {
    console.error("GET wishlist error:", err.message);
    res.status(500).json({ error: "Gagal mengambil wishlist" });
  }
};

// Tambah ke wishlist
exports.addToWishlist = async (req, res) => {
  const userId = req.user?.id || req.body.user_id;
  const { place_id } = req.body;

  try {
    await pool.query(
      `INSERT INTO wishlist (user_id, place_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
      [userId, place_id]
    );

    res.status(201).json({ success: true });
  } catch (err) {
    console.error("ADD wishlist error:", err.message);
    res.status(500).json({ error: "Gagal menambahkan ke wishlist" });
  }
};

// Hapus dari wishlist
exports.removeFromWishlist = async (req, res) => {
  const userId = req.user?.id || req.query.user_id;
  const placeId = req.params.placeId;

  try {
    await pool.query(
      `DELETE FROM wishlist WHERE user_id = $1 AND place_id = $2`,
      [userId, placeId]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("DELETE wishlist error:", err.message);
    res.status(500).json({ error: "Gagal menghapus dari wishlist" });
  }
};
