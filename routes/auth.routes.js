const express = require('express')
const { refresh, register, login, logout, get_user, me } = require('../controllers/auth.controller')
const decodedMiddlewares = require('../middlewares/auth')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refresh)
router.post('/logout', logout)
router.get('/get_user', get_user)
router.get('/me', decodedMiddlewares, me)

module.exports = router
