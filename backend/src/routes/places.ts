/** @format */

import { Router } from "express";
const router = Router();

// Contoh endpoint GET
router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "Pantai Parangtritis" },
    { id: 2, name: "Bakso Pak Kumis" },
  ]);
});

export default router;
