require('dotenv').config()

module.exports = {
  access: {
    secret: process.env.JWT_ACCESS_SECRET,
    expiresIn: '1h',
  },
  refresh: {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: '30d',
  },
}
