/**
 * ----------------------------------
 *   FILE: backend/controllers/placeController.js
 * ----------------------------------
 *
 * @format
 */

const pool = require("../db");

// GET all or search places
exports.getPlaces = async (req, res) => {
  const search = req.query.search || "";
  try {
    const result = await pool.query(
      `SELECT * FROM places WHERE LOWER(name) LIKE LOWER($1) ORDER BY id DESC`,
      [`%${search}%`]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengambil tempat." });
  }
};

// POST new place
exports.createPlace = async (req, res) => {
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
    sliderImagesUrl = [],
  } = req.body;

  const createdBy = req.headers["x-user"] || "anonymous";

  try {
    await pool.query(
      `INSERT INTO places 
       (name, category, location, open_hour, close_hour, price, description, maps_url, image_url, slider_images_url, created_by, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,NOW())`,
      [
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
        createdBy,
      ]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menambahkan tempat." });
  }
};

// PUT update place
exports.updatePlace = async (req, res) => {
  const id = req.params.id;
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
    sliderImagesUrl = [],
  } = req.body;

  const updatedBy = req.headers["x-user"] || "anonymous";

  try {
    await pool.query(
      `UPDATE places SET
       name=$1, category=$2, location=$3, open_hour=$4, close_hour=$5,
       price=$6, description=$7, maps_url=$8, image_url=$9, slider_images_url=$10,
       updated_by=$11, updated_at=NOW()
       WHERE id=$12`,
      [
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
        updatedBy,
        id,
      ]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengupdate tempat." });
  }
};

// DELETE place
exports.deletePlace = async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query("DELETE FROM places WHERE id=$1", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menghapus tempat." });
  }
};
