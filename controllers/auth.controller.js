const AuthService = require('../services/auth.service')

// Регистрация
exports.register = async (req, res) => {
  try {
    const { name, email, password, use } = req.body
    const result = await AuthService.register(name, email, password, use)

    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

// Вход
exports.login = async (req, res) => {
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
}

// Обновление токенов
exports.refresh = async (req, res) => {
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
}

exports.logout = async (req, res) => {
  try {
    await AuthService.logout(req.userId)
    res.json({ message: 'Logged out' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
