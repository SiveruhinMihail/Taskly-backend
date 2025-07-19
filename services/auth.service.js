const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../config/jwt')

class AuthService {
  // Генерация токенов
  static generateTokens(userId) {
    const accessToken = jwt.sign({ userId }, config.accessTokenSecret, {
      expiresIn: config.accessTokenExpiration,
    })

    const refreshToken = jwt.sign({ userId }, config.refreshTokenSecret, {
      expiresIn: config.refreshTokenExpiration,
    })

    return { accessToken, refreshToken }
  }

  // Регистрация пользователя
  static async register(name, email, password, use) {
    try {
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        throw new Error('User with this email already exists')
      }

      const user = new User({ name, email, password, use })
      await user.save()

      const { accessToken, refreshToken } = this.generateTokens(user._id)

      user.refreshToken = refreshToken
      await user.save()

      return {
        accessToken,
        refreshToken,
        userId: user._id,
        name: user.name,
        email: user.email,
      }
    } catch (error) {
      throw new Error(`Registration failed: ${error.message}`)
    }
  }

  // Вход пользователя
  static async login(email, password) {
    try {
      const user = await User.findOne({ email })
      if (!user) {
        throw new Error('User not found')
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        throw new Error('Invalid password')
      }

      const { accessToken, refreshToken } = this.generateTokens(user._id)

      user.refreshToken = refreshToken
      user.lastLogin = new Date()
      await user.save()

      return {
        accessToken,
        refreshToken,
        userId: user._id,
        name: user.name,
        email: user.email,
      }
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`)
    }
  }

  // Обновление токенов
  static async refreshTokens(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, config.refreshTokenSecret)

      const user = await User.findById(decoded.userId)
      if (!user || user.refreshToken !== refreshToken) {
        throw new Error('Invalid refresh token')
      }

      const { accessToken, refreshToken: newRefreshToken } = this.generateTokens(user._id)

      user.refreshToken = newRefreshToken
      await user.save()

      return {
        accessToken,
        refreshToken: newRefreshToken,
        userId: user._id,
      }
    } catch (error) {
      throw new Error(`Token refresh failed: ${error.message}`)
    }
  }

  static async logout(userId) {
    try {
      await User.findByIdAndUpdate(userId, { refreshToken: null })
      return {
        success: 'true',
      }
    } catch (error) {
      throw new Error(`Token refresh failed: ${error.message}`)
    }
  }
  static async get_user(userId) {
    try {
      const user = await User.findOne({ _id: userId })
      if (!user) {
        throw new Error('User not found')
      }
      return user
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`)
    }
  }
}
//687bd03f8ceb67ac6da3ac9c
module.exports = AuthService
