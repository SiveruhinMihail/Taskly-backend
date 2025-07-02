const express = require('express')
const router = express.Router()
const { login, refresh, logout } = require('../controllers/auth.controller') // Исправлен путь
const authMiddleware = require('../middlewares/auth') // Исправлен путь

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Аутентификация пользователей
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Вход в систему
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Успешный вход
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       401:
 *         description: Неверные учетные данные
 */

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Обновление токена
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Токен обновлен
 *       401:
 *         description: Невалидный токен
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Выход из системы
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Успешный выход
 *       401:
 *         description: Пользователь не авторизован
 */

router.post('/login', login)
router.post('/refresh', refresh)
router.post('/logout', authMiddleware, logout)

module.exports = router
