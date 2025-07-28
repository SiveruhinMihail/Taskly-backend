const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../config/jwt')
const generateUse = require('../utils/generateUse')
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

  static generateAccessToken(userId) {
    const accessToken = jwt.sign({ userId }, config.accessTokenSecret, {
      expiresIn: config.accessTokenExpiration,
    })

    return accessToken
  }

  // Регистрация пользователя
  static async register(name, email, password) {
    try {
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        throw new Error('User with this email already exists')
      }
      const use = await generateUse()
      const user = new User({ name, email, password, use })
      await user.save()

      const { accessToken, refreshToken } = this.generateTokens(user._id)

      user.refreshToken = refreshToken
      await user.save()

      return {
        accessToken,
        refreshToken,
      }
    } catch (error) {
      throw new Error(`Registration failed: ${error.message}`)
    }
  }

  //
  // Вход пользователя
  static async login(email, password) {
    try {
      const user = await User.findOne({ email: email })
      if (!user) {
        throw new Error('User not found')
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        throw new Error('Invalid password')
      }

      const { accessToken, refreshToken } = this.generateTokens(user._id)

      user.refreshToken = refreshToken
      user.lastSeen = new Date()
      await user.save()

      return {
        accessToken,
        refreshToken,
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

      const accessToken = this.generateAccessToken(user._id)

      return accessToken
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
  static async get_user(email) {
    try {
      const user = await User.findOne({ email: email })
      if (!user) {
        throw new Error('User not found')
      }
      return user
    } catch (error) {
      throw new Error(`User not found: ${error.message}`)
    }
  }

  static async me(userID) {
    try {
      const user = await User.findById(userID).select('-password -__v -refreshToken')
      if (!user) {
        throw new Error('User not found')
      }
      return user
    } catch (error) {
      throw new Error(`User not found: ${error.message}`)
    }
  }
}
module.exports = AuthService
