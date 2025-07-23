const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({
        data: {
          detail: 'Требуется токен авторизации',
          config: {
            url: req.originalUrl,
            method: req.method,
            params: req.query,
            data: req.body,
          },
        },
      })
    }
    const accessToken = authHeader.split(' ')[1]

    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
    req.userId = decoded.userId
    return next()
  } catch (err) {
    return res.status(401).json({
      data: {
        detail: 'Токен недействителен или просрочен',
        config: {
          url: req.originalUrl,
          method: req.method,
          params: req.query,
          data: req.body,
        },
      },
    })
  }
}
