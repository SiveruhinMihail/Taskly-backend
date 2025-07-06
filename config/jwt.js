require('dotenv').config()
module.exports = {
  accessTokenSecret: process.env.JWT_ACCESS_SECRET || 'your_access_secret',
  refreshTokenSecret: process.env.JWT_REFRESH_SECRET || 'your_refresh_secret',
  accessTokenExpiration: '15m',
  refreshTokenExpiration: '30d'
};