/** @format */

const db = require("./db");

db.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Gagal konek:", err);
  } else {
    console.log("✅ Koneksi berhasil:", res.rows);
  }
});
