const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    const urlWithoutParams = req.originalUrl.split('?')[0]
    if (!authHeader) {
      return res.status(401).json({
        data: {
          detail: 'Токен недействителен или просрочен',
          config: {
            url: urlWithoutParams,
            method: req.method,
            data: req.body,
            params: req.query,
          },
        },
      })
    }
    const accessToken = authHeader.split(' ')[1]

    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
    if (decoded.userId) {
      return next()
    } else {
      return res.status(401)
    }
  } catch {
    const urlWithoutParams = req.originalUrl.split('?')[0]
    return res.status(401).json({
      data: {
        detail: 'Токен недействителен или просрочен',
        config: {
          url: urlWithoutParams,
          method: req.method,
          data: req.body,
          params: req.query,
        },
      },
    })
  }
}
