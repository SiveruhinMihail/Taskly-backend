const express = require('express')
const { refresh, register, login, logout } = require('../controllers/auth.controller')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refresh)
router.post('/logout', logout)

module.exports = router
