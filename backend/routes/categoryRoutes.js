/** @format */

// FILE: routes/categoryRoutes.js

const express = require("express");
const router = express.Router();
const db = require("../db"); // koneksi PostgreSQL

// GET semua kategori
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM categories ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("❌ ERROR GET kategori:", error);
    res.status(500).json({ error: "Gagal mengambil data kategori" });
  }
});

// POST tambah kategori
router.post("/", async (req, res) => {
  const { name, imageUrl, isActive } = req.body;

  console.log("📥 Data masuk dari frontend:", { name, imageUrl, isActive });

  try {
    const result = await db.query(
      `INSERT INTO categories (name, image_url, is_active) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [name, imageUrl, isActive ?? true]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ ERROR saat insert kategori:", error);
    res.status(500).json({ error: "Gagal menambahkan kategori" });
  }
});

// PUT edit kategori
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, imageUrl, isActive } = req.body;

  console.log("✏️ Data update kategori:", { id, name, imageUrl, isActive });

  try {
    await db.query(
      `UPDATE categories 
       SET name = $1, image_url = $2, is_active = $3, updated_at = NOW() 
       WHERE id = $4`,
      [name, imageUrl, isActive, id]
    );
    res.json({ message: "Kategori berhasil diperbarui" });
  } catch (error) {
    console.error("❌ ERROR saat update kategori:", error);
    res.status(500).json({ error: "Gagal mengedit kategori" });
  }
});

// DELETE kategori
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM categories WHERE id = $1", [id]);
    res.json({ message: "Kategori berhasil dihapus" });
  } catch (error) {
    console.error("❌ ERROR saat hapus kategori:", error);
    res.status(500).json({ error: "Gagal menghapus kategori" });
  }
});

module.exports = router;
