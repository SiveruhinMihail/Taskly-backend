const AuthService = require('../services/auth.service')

// Регистрация
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const result = await AuthService.register(name, email, password)

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

// Обновление токена
exports.refresh = async (req, res) => {
  try {
    const refreshToken = req.headers['jwt-refresh']
    const accessToken = await AuthService.refreshTokens(refreshToken)

    res.json({
      success: true,
      data: {
        access_token: accessToken, // Убедитесь в правильности поля
      },
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

exports.get_user = async (req, res) => {
  try {
    const { email: userEmail } = req.query
    const result = await AuthService.get_user(userEmail)

    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.me = async (req, res) => {
  try {
    const userData = await AuthService.me(req.userId)
    res.status(200).json({
      success: true,
      data: userData,
    })
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    })
  }
}
