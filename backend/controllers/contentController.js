/** @format */

const db = require("../db");
const fs = require("fs");
const path = require("path");

// ===================================
// 🖼️ SLIDER
// ===================================
exports.getSliders = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM homepage_sliders ORDER BY id DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error getSliders:", err);
    res.status(500).json({ error: "Gagal mengambil slider" });
  }
};

exports.createSlider = async (req, res) => {
  const { title, description, cta_text, image_url } = req.body;
  console.log("📦 createSlider BODY:", req.body);
  try {
    await db.query(
      `INSERT INTO homepage_sliders (title, description, cta_text, image_url)
       VALUES ($1, $2, $3, $4)`,
      [title, description, cta_text, image_url]
    );
    res.json({ message: "Slider berhasil ditambahkan" });
  } catch (err) {
    console.error("❌ Error createSlider:", err);
    res.status(500).json({ error: "Gagal menambahkan slider" });
  }
};

exports.updateSlider = async (req, res) => {
  const { id } = req.params;
  const { title, description, cta_text, image_url } = req.body;
  console.log("📦 updateSlider BODY:", req.body);
  try {
    await db.query(
      `UPDATE homepage_sliders
       SET title = $1, description = $2, cta_text = $3, image_url = $4
       WHERE id = $5`,
      [title, description, cta_text, image_url, id]
    );
    res.json({ message: "Slider berhasil diperbarui" });
  } catch (err) {
    console.error("❌ Error updateSlider:", err);
    res.status(500).json({ error: "Gagal memperbarui slider" });
  }
};

exports.deleteSlider = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(`DELETE FROM homepage_sliders WHERE id = $1`, [id]);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error deleteSlider:", err);
    res.status(500).json({ error: "Gagal menghapus slider" });
  }
};

// ===================================
// 🖼️ LOGO WEBSITE
// ===================================
exports.updateLogo = async (req, res) => {
  const { logo_url } = req.body;
  console.log("📦 updateLogo BODY:", req.body);

  if (typeof logo_url !== "string") {
    return res.status(400).json({ error: "logo_url harus berupa string" });
  }

  try {
    // Ambil logo lama
    const oldLogo = await db.query(
      `SELECT value FROM website_config WHERE key = 'logo_url'`
    );
    const oldLogoUrl = oldLogo.rows[0]?.value;

    // Simpan logo baru (atau kosong)
    await db.query(
      `INSERT INTO website_config (key, value)
       VALUES ('logo_url', $1)
       ON CONFLICT (key) DO UPDATE SET value = $1, updated_at = NOW()`,
      [logo_url]
    );

    // Hapus file lama jika diganti dan file sebelumnya valid
    if (oldLogoUrl && oldLogoUrl !== logo_url) {
      const filename = path.basename(oldLogoUrl);
      const filepath = path.join(__dirname, "../uploads", filename);
      fs.unlink(filepath, (err) => {
        if (err) console.warn("⚠️ Gagal hapus logo lama:", err.message);
      });
    }

    res.json({ message: "Logo berhasil diperbarui", logo_url });
  } catch (err) {
    console.error("❌ Logo update error:", err);
    res.status(500).json({ error: "Gagal update logo" });
  }
};

exports.getLogo = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT value AS logo_url FROM website_config WHERE key = 'logo_url'`
    );
    res.json(result.rows[0] || { logo_url: null });
  } catch (err) {
    console.error("❌ Error getLogo:", err);
    res.status(500).json({ error: "Gagal mengambil logo" });
  }
};
