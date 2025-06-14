/** @format */

const db = require("../db");
const bcrypt = require("bcrypt");

// ==========================
// 🔍 Ambil Data Profil User
// ==========================
exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await db.query(
      `SELECT id, name, email, role, login_count, created_at, profile_picture 
       FROM users WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error getting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ==========================
// 📝 Update Profil User
// ==========================
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email, password } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Nama dan email wajib diisi" });
    }

    const emailCheck = await db.query(
      "SELECT id FROM users WHERE email = $1 AND id != $2",
      [email, userId]
    );
    if (emailCheck.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Email sudah digunakan oleh pengguna lain" });
    }

    let hashedPassword = null;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const updateQuery = hashedPassword
      ? "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4"
      : "UPDATE users SET name = $1, email = $2 WHERE id = $3";

    const params = hashedPassword
      ? [name, email, hashedPassword, userId]
      : [name, email, userId];

    await db.query(updateQuery, params);

    res.json({ message: "Profil berhasil diperbarui" });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Gagal memperbarui profil" });
  }
};

// ==========================
// 🖼️ Update Foto Profil User
// ==========================
exports.updateProfilePicture = async (req, res) => {
  try {
    const userId = req.userId;
    const { profile_picture } = req.body;

    if (!profile_picture) {
      return res.status(400).json({ error: "URL foto profil wajib diisi" });
    }

    await db.query("UPDATE users SET profile_picture = $1 WHERE id = $2", [
      profile_picture,
      userId,
    ]);

    res.json({ message: "Foto profil berhasil diperbarui" });
  } catch (err) {
    console.error("Error updating profile picture:", err);
    res.status(500).json({ error: "Gagal memperbarui foto profil" });
  }
};

// ==========================
// 📬 Kirim Rekomendasi Tempat
// ==========================
exports.submitRecommendation = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      name,
      category,
      location,
      openHour,
      closeHour,
      price,
      description,
      mapsUrl,
      imageUrl,
      sliderImagesUrl,
    } = req.body;

    const result = await db.query(
      `INSERT INTO recommendations 
        (user_id, name, category, location, open_hour, close_hour, price, description, maps_url, image_url, slider_images_url) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
        RETURNING *`,
      [
        userId,
        name,
        category,
        location,
        openHour,
        closeHour,
        price,
        description,
        mapsUrl,
        imageUrl,
        sliderImagesUrl || [],
      ]
    );

    res.status(200).json({
      message: "Rekomendasi berhasil dikirim",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Error insert recommendation:", err);
    res.status(500).json({ error: "Gagal mengirim rekomendasi" });
  }
};

// ==========================
// 📄 Ambil Semua Rekomendasi User
// ==========================
exports.getMyRecommendations = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await db.query(
      `SELECT r.*, c.name AS category_name 
       FROM recommendations r 
       LEFT JOIN categories c ON r.category = c.id 
       WHERE r.user_id = $1 
       ORDER BY r.created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error get user recommendations:", err);
    res.status(500).json({ error: "Gagal mengambil data rekomendasi" });
  }
};
