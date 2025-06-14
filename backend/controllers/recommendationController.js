/** @format */
const db = require("../db");

// ================================
// 📥 Ambil Semua Rekomendasi
// ================================
exports.getRecommendations = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT r.*, u.name AS submitted_by
      FROM recommendations r
      JOIN users u ON r.user_id = u.id
      ORDER BY r.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      error: "Gagal mengambil rekomendasi",
      detail: err.message,
    });
  }
};

// ================================
// 🔍 Ambil Rekomendasi by ID
// ================================
exports.getRecommendationById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      `
      SELECT r.*, u.name AS submitted_by
      FROM recommendations r
      JOIN users u ON r.user_id = u.id
      WHERE r.id = $1
    `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Rekomendasi tidak ditemukan" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      error: "Gagal mengambil detail rekomendasi",
      detail: err.message,
    });
  }
};

// ================================
// ✅ Setujui → Pindahkan ke `places`
// ================================
exports.approveRecommendation = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM recommendations WHERE id = $1",
      [id]
    );
    const rec = result.rows[0];

    if (!rec) {
      return res.status(404).json({ message: "Rekomendasi tidak ditemukan" });
    }

    await db.query(
      `
      INSERT INTO places (
        name, category, location, open_hour, close_hour, price,
        description, maps_url, image_url, slider_images_url, status, created_by
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
    `,
      [
        rec.name,
        rec.category,
        rec.location,
        rec.open_hour,
        rec.close_hour,
        rec.price,
        rec.description,
        rec.maps_url,
        rec.image_url,
        rec.slider_images_url,
        "Masih Buka",
        rec.user_id,
      ]
    );

    await db.query("DELETE FROM recommendations WHERE id = $1", [id]);

    res.json({
      message: "Rekomendasi disetujui dan ditambahkan ke daftar tempat",
    });
  } catch (err) {
    res.status(500).json({
      error: "Gagal menyetujui rekomendasi",
      detail: err.message,
    });
  }
};

// ================================
// ❌ Tolak → Update status & alasan
// ================================
exports.rejectRecommendation = async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  try {
    const result = await db.query(
      "SELECT * FROM recommendations WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Rekomendasi tidak ditemukan" });
    }

    await db.query("UPDATE recommendations SET status = $1 WHERE id = $2", [
      `Ditolak: ${reason || "Tidak sesuai kriteria"}`,
      id,
    ]);

    res.json({ message: "Rekomendasi ditolak", reason });
  } catch (err) {
    res.status(500).json({
      error: "Gagal menolak rekomendasi",
      detail: err.message,
    });
  }
};
