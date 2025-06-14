"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Contoh endpoint GET
router.get("/", (req, res) => {
    res.json([
        { id: 1, name: "Pantai Parangtritis" },
        { id: 2, name: "Bakso Pak Kumis" },
    ]);
});
exports.default = router;
