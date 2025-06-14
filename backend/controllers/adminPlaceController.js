/** @format */
const db = require("../db");

// ===============================
// ✅ GET Semua Tempat
// ===============================
exports.getPlaces = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT p.*, c.name AS category_name
      FROM places p
      JOIN categories c ON p.category = c.id
      ORDER BY p.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("GET PLACES error:", err.message);
    res.status(500).json({ error: "Gagal mengambil data tempat." });
  }
};

// ===============================
// ✅ GET Tempat by ID
// ===============================
exports.getPlaceById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query("SELECT * FROM places WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tempat tidak ditemukan" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("GET PLACE BY ID error:", err.message);
    res
      .status(500)
      .json({ error: "Gagal mengambil tempat", detail: err.message });
  }
};

// ===============================
// ✅ CREATE Tempat Baru (FINAL)
// ===============================
exports.createPlace = async (req, res) => {
  try {
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
      status = "Masih Buka",
      createdBy = "admin",
    } = req.body;

    if (!name || !category || !location) {
      return res
        .status(400)
        .json({ error: "Nama, kategori, dan lokasi wajib diisi." });
    }

    const sliderArray = Array.isArray(sliderImagesUrl) ? sliderImagesUrl : [];
    const openingHours = `${openHour || "-"} - ${closeHour || "-"}`;
    const priceRange = price?.toString() || "";

    await db.query(
      `INSERT INTO places (
        name, category, description, location,
        price_range, opening_hours, maps_link,
        image_cover, image_slider, status,
        created_by, created_at
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,NOW())`,
      [
        name,
        category,
        description || "",
        location,
        priceRange,
        openingHours,
        mapsUrl || "",
        imageUrl || "",
        JSON.stringify(sliderArray),
        status,
        createdBy,
      ]
    );

    res.status(201).json({ message: "Tempat berhasil ditambahkan." });
  } catch (err) {
    console.error("CREATE PLACE error:", err.message);
    res
      .status(500)
      .json({ error: "Gagal menambahkan tempat.", detail: err.message });
  }
};

// ===============================
// ✅ UPDATE Tempat
// ===============================
exports.updatePlace = async (req, res) => {
  const id = req.params.id;
  try {
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
      status,
      updatedBy = "admin",
    } = req.body;

    if (!name || !category || !location) {
      return res
        .status(400)
        .json({ error: "Nama, kategori, dan lokasi wajib diisi." });
    }

    const sliderArray = Array.isArray(sliderImagesUrl) ? sliderImagesUrl : [];
    const openingHours = `${openHour || "-"} - ${closeHour || "-"}`;
    const priceRange = price?.toString() || "";

    await db.query(
      `UPDATE places SET
        name = $1,
        category = $2,
        description = $3,
        location = $4,
        price_range = $5,
        opening_hours = $6,
        maps_link = $7,
        image_cover = $8,
        image_slider = $9,
        status = $10,
        updated_by = $11,
        updated_at = NOW()
      WHERE id = $12`,
      [
        name,
        category,
        description || "",
        location,
        priceRange,
        openingHours,
        mapsUrl || "",
        imageUrl || "",
        JSON.stringify(sliderArray),
        status,
        updatedBy,
        id,
      ]
    );

    res.json({ message: "Tempat berhasil diperbarui." });
  } catch (err) {
    console.error("UPDATE PLACE error:", err.message);
    res
      .status(500)
      .json({ error: "Gagal memperbarui tempat.", detail: err.message });
  }
};

// ===============================
// ✅ DELETE Tempat
// ===============================
exports.deletePlace = async (req, res) => {
  const id = req.params.id;
  try {
    await db.query("DELETE FROM places WHERE id = $1", [id]);
    res.json({ message: "Tempat berhasil dihapus." });
  } catch (err) {
    console.error("DELETE PLACE error:", err.message);
    res.status(500).json({ error: "Gagal menghapus tempat." });
  }
};

// ===============================
// ✅ SEARCH Tempat by Keyword
// ===============================
exports.searchPlaces = async (req, res) => {
  const q = req.query.q || "";
  try {
    const result = await db.query(
      `SELECT * FROM places WHERE LOWER(name) LIKE LOWER($1)`,
      [`%${q}%`]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("SEARCH PLACE error:", err.message);
    res.status(500).json({ error: "Gagal mencari tempat." });
  }
};

// ===============================
// ✅ PAGINATION
// ===============================
exports.getPlacesPaginated = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const result = await db.query(
      `SELECT * FROM places ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("PAGINATION error:", err.message);
    res.status(500).json({ error: "Gagal mengambil data paginasi." });
  }
};

// ===========================
// 📥 Tempat Terbaru Ditambahkan oleh Admin/User
// ===========================
exports.getPlacesPaginated = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const result = await db.query(
      `SELECT id, name, location, image_cover
       FROM places
       WHERE created_by IS NOT NULL
       ORDER BY created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    res.json({ data: result.rows });
  } catch (err) {
    console.error("❌ Error getPlacesPaginated:", err.message);
    res
      .status(500)
      .json({ error: "Gagal mengambil tempat terbaru yang dibuat" });
  }
};

// ===============================
// ✅ FILTER Tempat
// ===============================
exports.filterPlaces = async (req, res) => {
  const { category, status } = req.query;
  try {
    let query = `SELECT * FROM places WHERE 1=1`;
    const values = [];

    if (category) {
      values.push(category);
      query += ` AND category = $${values.length}`;
    }

    if (status) {
      values.push(status);
      query += ` AND status = $${values.length}`;
    }

    query += " ORDER BY created_at DESC";

    const result = await db.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error("FILTER PLACE error:", err.message);
    res.status(500).json({ error: "Gagal memfilter data tempat." });
  }
};
