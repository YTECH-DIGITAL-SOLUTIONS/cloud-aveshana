/** @format */

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/authRoutes"); // ✅ pastikan pathnya sesuai

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
å
// ✅ REGISTER ROUTES
app.use("/api/auth", authRoutes); // <== Wajib

// Optional: test route
app.get("/", (req, res) => {
  res.send("✅ Bhumi Aveshana API aktif");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);
});
