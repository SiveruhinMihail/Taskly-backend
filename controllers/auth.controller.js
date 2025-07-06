const AuthService = require('../services/auth.service')

const authController = {
  // Регистрация
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body
      const result = await AuthService.register(name, email, password)

      res.status(201).json({
        success: true,
        data: result,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      })
    }
  },

  // Вход
  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const result = await AuthService.login(email, password)

      res.json({
        success: true,
        data: result,
      })
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message,
      })
    }
  },

  // Обновление токенов
  refresh: async (req, res) => {
    try {
      const { refreshToken } = req.body
      const result = await AuthService.refreshTokens(refreshToken)

      res.json({
        success: true,
        data: result,
      })
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message,
      })
    }
  },
}

module.exports = authController
