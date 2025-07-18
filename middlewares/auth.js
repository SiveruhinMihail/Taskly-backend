const jwt = require('jsonwebtoken')
const { secret } = require('../config/jwt')

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ error: 'Access denied' })

  try {
    const decoded = jwt.verify(token, secret)
    req.userId = decoded.id
    next()
  } catch {
    res.status(400).json({ error: 'Invalid token' })
  }
}
