/** @format */

/** @format */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = parseInt(process.env.PORT || "8080", 10);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Bhumi Aveshana aktif 🚀");
});

import placeRoutes from "./routes/places";
app.use("/places", placeRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server berjalan di port ${port}`);
});

