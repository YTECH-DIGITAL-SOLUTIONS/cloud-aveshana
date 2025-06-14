/** @format */

const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ==============================
// 🔐 LOGIN USER
// ==============================
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email dan password wajib diisi" });

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0)
      return res.status(401).json({ message: "Email tidak ditemukan" });

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Password salah" });

    // 🔐 Cek JWT secret
    if (!process.env.JWT_SECRET)
      return res.status(500).json({ message: "JWT secret tidak tersedia" });

    const token = jwt.sign(
      { id: user.id, role: user.role || "user" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🚀 Tambah login count
    await db.query(
      "UPDATE users SET login_count = login_count + 1 WHERE id = $1",
      [user.id]
    );

    // ✅ Kirim data tanpa password
    const { password: _, ...userData } = user;

    res.json({
      message: "Login berhasil",
      token,
      user: userData,
    });
  } catch (err) {
    res.status(500).json({ message: "Gagal login user", error: err.message });
  }
};

// ==============================
// 🔐 LOGIN ADMIN
// ==============================
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email dan password wajib diisi" });

  try {
    const result = await db.query("SELECT * FROM admins WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0)
      return res.status(401).json({ message: "Admin tidak ditemukan" });

    const admin = result.rows[0];

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ message: "Password salah" });

    if (!process.env.JWT_SECRET)
      return res.status(500).json({ message: "JWT secret tidak tersedia" });

    const token = jwt.sign(
      { id: admin.id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: _, ...adminData } = admin;

    res.json({
      message: "Login admin berhasil",
      token,
      admin: adminData,
    });
  } catch (err) {
    res.status(500).json({ message: "Gagal login admin", error: err.message });
  }
};

// ==============================
// 📝 REGISTER USER
// ==============================
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res
      .status(400)
      .json({ message: "Nama, email, dan password wajib diisi" });

  try {
    const hashed = await bcrypt.hash(password, 10);

    const result = await db.query(
      `INSERT INTO users (name, email, password, role, login_count)
       VALUES ($1, $2, $3, $4, 0)
       RETURNING id, name, email, role`,
      [name, email, hashed, "user"]
    );

    res.status(201).json({
      message: "Registrasi user berhasil",
      user: result.rows[0],
    });
  } catch (err) {
    if (err.code === "23505") {
      res.status(409).json({ message: "Email sudah terdaftar" });
    } else {
      res.status(500).json({
        message: "Gagal registrasi user",
        error: err.message,
      });
    }
  }
};

// ==============================
// 📝 REGISTER ADMIN
// ==============================
exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res
      .status(400)
      .json({ message: "Nama, email, dan password wajib diisi" });

  try {
    const hashed = await bcrypt.hash(password, 10);

    const result = await db.query(
      `INSERT INTO admins (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [name, email, hashed]
    );

    res.status(201).json({
      message: "Registrasi admin berhasil",
      admin: result.rows[0],
    });
  } catch (err) {
    if (err.code === "23505") {
      res.status(409).json({ message: "Email admin sudah terdaftar" });
    } else {
      res.status(500).json({
        message: "Gagal registrasi admin",
        error: err.message,
      });
    }
  }
};
