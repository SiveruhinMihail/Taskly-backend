const express = require("express");
const router = express.Router();
const { login, refresh, logout } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth");

router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", authMiddleware, logout); // Требует авторизации

module.exports = router;
