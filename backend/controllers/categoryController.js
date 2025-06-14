/** @format */

const db = require("../db");

// Ambil semua kategori
exports.getCategories = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM categories ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Gagal mengambil kategori:", err);
    res.status(500).json({ error: "Gagal mengambil data kategori" });
  }
};

// Tambah kategori baru
exports.createCategory = async (req, res) => {
  const { name, imageUrl, isActive } = req.body;

  try {
    await db.query(
      "INSERT INTO categories (name, image_url, is_active) VALUES ($1, $2, $3)",
      [name, imageUrl, isActive]
    );
    res.status(201).json({ message: "Kategori berhasil ditambahkan" });
  } catch (err) {
    console.error("Gagal tambah kategori:", err);
    res.status(500).json({ error: "Gagal menambahkan kategori" });
  }
};

// Update kategori
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, imageUrl, isActive } = req.body;

  try {
    await db.query(
      "UPDATE categories SET name = $1, image_url = $2, is_active = $3 WHERE id = $4",
      [name, imageUrl, isActive, id]
    );
    res.json({ message: "Kategori berhasil diperbarui" });
  } catch (err) {
    console.error("Gagal update kategori:", err);
    res.status(500).json({ error: "Gagal memperbarui kategori" });
  }
};

// Hapus kategori
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM categories WHERE id = $1", [id]);
    res.json({ message: "Kategori berhasil dihapus" });
  } catch (err) {
    console.error("Gagal hapus kategori:", err);
    res.status(500).json({ error: "Gagal menghapus kategori" });
  }
};
