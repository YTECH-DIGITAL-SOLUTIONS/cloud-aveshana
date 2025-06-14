/** @format */

const db = require("../db");
const bcrypt = require("bcryptjs");

// ===========================
// ✅ Login Admin
// ===========================
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await db.query("SELECT * FROM admins WHERE email = $1", [
      email,
    ]);
    const admin = result.rows[0];

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    res.json({
      message: "Login admin berhasil",
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: "admin",
        status: admin.status,
        profile_picture: admin.profile_picture || null,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Gagal login admin", detail: err.message });
  }
};

// ===========================
// 📊 Statistik Dashboard
// ===========================
exports.getStats = async (req, res) => {
  try {
    const users = await db.query("SELECT COUNT(*) FROM users");
    const places = await db.query("SELECT COUNT(*) FROM places");
    const reviews = await db.query("SELECT COUNT(*) FROM reviews");
    const categories = await db.query("SELECT COUNT(*) FROM categories");

    res.json({
      totalUsers: parseInt(users.rows[0].count),
      totalPlaces: parseInt(places.rows[0].count),
      totalReviews: parseInt(reviews.rows[0].count),
      totalCategories: parseInt(categories.rows[0].count),
    });
  } catch (err) {
    console.error("🔥 ERROR getStats:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ===========================
// 📈 Traffic Login 7 Hari
// ===========================
exports.getTraffic = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT TO_CHAR(login_at::date, 'Dy') AS day, COUNT(*) AS visitors
      FROM login_logs
      WHERE login_at >= NOW() - INTERVAL '6 days'
      GROUP BY login_at::date
      ORDER BY login_at::date
    `);

    const data = result.rows.map((row) => ({
      day: row.day,
      visitors: parseInt(row.visitors),
    }));

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// ===========================
// 📊 Distribusi Kategori
// ===========================
exports.getCategories = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT c.name, COUNT(p.id) AS value
      FROM categories c
      LEFT JOIN places p ON p.category = c.id
      GROUP BY c.name
    `);

    const data = result.rows.map((row) => ({
      name: row.name,
      value: parseInt(row.value),
    }));

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// ===========================
// 🧾 Aktivitas User untuk Donat
// ===========================
exports.getUserActivities = async (req, res) => {
  try {
    const reviews = await db.query("SELECT COUNT(*) FROM reviews");
    const wishlist = await db.query("SELECT COUNT(*) FROM wishlist");
    const recommendations = await db.query(
      "SELECT COUNT(*) FROM recommendations"
    );
    const logins = await db.query("SELECT COUNT(*) FROM login_logs");

    res.json([
      { name: "Ulasan", value: parseInt(reviews.rows[0].count) },
      { name: "Wishlist", value: parseInt(wishlist.rows[0].count) },
      { name: "Rekomendasi", value: parseInt(recommendations.rows[0].count) },
      { name: "Kunjungan", value: parseInt(logins.rows[0].count) },
    ]);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// ===========================
// 🧩 Komposisi Global
// ===========================
exports.getGlobalSummary = async (req, res) => {
  try {
    const users = await db.query("SELECT COUNT(*) FROM users");
    const places = await db.query("SELECT COUNT(*) FROM places");
    const reviews = await db.query("SELECT COUNT(*) FROM reviews");
    const categories = await db.query("SELECT COUNT(*) FROM categories");

    const data = [
      { name: "Users", value: parseInt(users.rows[0].count) },
      { name: "Tempat", value: parseInt(places.rows[0].count) },
      { name: "Ulasan", value: parseInt(reviews.rows[0].count) },
      { name: "Kategori", value: parseInt(categories.rows[0].count) },
    ];

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// ===========================
// 🆕 Tempat Terbaru (5 Data)
// ===========================
exports.getLatestPlaces = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT id, name, location, image_cover
      FROM places
      ORDER BY created_at DESC
      LIMIT 5
    `);
    res.json({ data: result.rows });
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil tempat terbaru" });
  }
};

// ===========================
// 👥 Manajemen Pengguna (Admin/User)
// ===========================
exports.getAllUsers = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT id, name, email, status, 'user' AS role, profile_picture FROM users
      UNION ALL
      SELECT id, name, email, status, 'admin' AS role, profile_picture FROM admins
      ORDER BY name ASC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data pengguna" });
  }
};

exports.createUser = async (req, res) => {
  const { name, email, password, role, status } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);

    if (role === "admin") {
      await db.query(
        "INSERT INTO admins (name, email, password, status) VALUES ($1, $2, $3, $4)",
        [name, email, hashed, status]
      );
    } else {
      await db.query(
        "INSERT INTO users (name, email, password, role, status) VALUES ($1, $2, $3, $4, $5)",
        [name, email, hashed, role, status]
      );
    }

    res.json({ message: `${role} berhasil ditambahkan` });
  } catch (err) {
    res.status(500).json({ error: `Gagal menambahkan ${role}` });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, status } = req.body;

  try {
    if (role === "admin") {
      await db.query(
        "UPDATE admins SET name=$1, email=$2, status=$3 WHERE id=$4",
        [name, email, status, id]
      );
    } else {
      await db.query(
        "UPDATE users SET name=$1, email=$2, role=$3, status=$4 WHERE id=$5",
        [name, email, role, status, id]
      );
    }

    res.json({ message: `${role} berhasil diperbarui` });
  } catch (err) {
    res.status(500).json({ error: `Gagal mengupdate ${role}` });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const query =
      role === "admin"
        ? "DELETE FROM admins WHERE id = $1"
        : "DELETE FROM users WHERE id = $1";

    await db.query(query, [id]);
    res.json({ message: `${role} berhasil dihapus` });
  } catch (err) {
    res.status(500).json({ error: `Gagal menghapus ${role}` });
  }
};

exports.updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { status, role } = req.body;

  try {
    const query =
      role === "admin"
        ? "UPDATE admins SET status = $1 WHERE id = $2"
        : "UPDATE users SET status = $1 WHERE id = $2";

    await db.query(query, [status, id]);
    res.json({ message: `Status ${role} diperbarui` });
  } catch (err) {
    res.status(500).json({ error: "Gagal memperbarui status" });
  }
};

exports.resetUserPassword = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const hashed = await bcrypt.hash("user123", 10);
    const query =
      role === "admin"
        ? "UPDATE admins SET password = $1 WHERE id = $2"
        : "UPDATE users SET password = $1 WHERE id = $2";

    await db.query(query, [hashed, id]);
    res.json({ message: `Password ${role} berhasil direset ke 'user123'` });
  } catch (err) {
    res.status(500).json({ error: "Gagal mereset password" });
  }
};

// ===========================
// 🖼️ Update Foto Profil Admin
// ===========================
exports.updateProfilePicture = async (req, res) => {
  const { id } = req.params;
  const { profile_picture } = req.body;

  try {
    await db.query("UPDATE admins SET profile_picture = $1 WHERE id = $2", [
      profile_picture,
      id,
    ]);
    res.json({ message: "Foto profil admin berhasil diperbarui" });
  } catch (err) {
    res.status(500).json({ error: "Gagal update foto profil admin" });
  }
};
