const jwt = require('jsonwebtoken')
const { secret } = require('../config/jwt')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization
  const accessToken = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
    req.userId = decoded.userId
    next()
  } catch {
    res.status(400).json({ error: 'Invalid token' })
  }
}
