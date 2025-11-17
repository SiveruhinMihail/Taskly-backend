const express = require('express')
const { refresh, register, login, logout, get_user, me } = require('../controllers/auth.controller')
const checkToken = require('../middlewares/auth')
const decodedMiddlewares = require('../middlewares/me')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refresh)
router.post('/logout', logout)
router.get('/get_user', checkToken, get_user)
router.get('/me', decodedMiddlewares, me) 

module.exports = router
