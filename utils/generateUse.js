const UserModel = require('../models/User')
const generateRandomString = (length) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
const generateUse = async (length = 6, maxAttempts = 3) => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const us = generateRandomString(length)
    const existingUser = await UserModel.findOne({ us })
    if (!existingUser) {
      return us
    }
  }
}
module.exports = generateUse
