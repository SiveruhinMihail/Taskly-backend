const express = require('express')
const { refresh, register, login, logout, get_user } = require('../controllers/auth.controller')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refresh)
router.post('/logout', logout)
router.get('/get_user', get_user)

module.exports = router
