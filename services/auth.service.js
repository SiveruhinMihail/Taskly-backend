const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { access, refresh } = require('../config/jwt')

class AuthService {
  // Генерация токенов
  static generateTokens(userId) {
    const accessToken = jwt.sign({ id: userId }, access.secret, {
      expiresIn: access.expiresIn,
    })
    const refreshToken = jwt.sign({ id: userId }, refresh.secret, {
      expiresIn: refresh.expiresIn,
    })
    return { accessToken, refreshToken }
  }

  // Логин
  static async login(email, password) {
    const user = await User.findOne({ email })
    if (!user) throw new Error('User not found')

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) throw new Error('Invalid password')

    const { accessToken, refreshToken } = this.generateTokens(user._id)
    user.refreshToken = refreshToken
    await user.save()

    return { accessToken, refreshToken, userId: user._id }
  }

  // Обновление токенов
  static async refreshTokens(refreshToken) {
    const decoded = jwt.verify(refreshToken, refresh.secret)
    const user = await User.findById(decoded.id)
    if (!user || user.refreshToken !== refreshToken) throw new Error('Invalid refresh token')

    const { accessToken, newRefreshToken } = this.generateTokens(user._id)
    user.refreshToken = newRefreshToken
    await user.save()

    return { accessToken, refreshToken: newRefreshToken }
  }

  // Выход
  static async logout(userId) {
    await User.findByIdAndUpdate(userId, { refreshToken: null })
  }
}

module.exports = AuthService
