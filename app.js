require('dotenv').config()

const express = require('express')

const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./config/swagger')

const connectDB = require('./config/db')
const authRoutes = require('./routes/auth.routes')

const PORT = process.env.PORT

const app = express()

app.use(express.json())

connectDB()

app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Привет, мир! �')
})


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(PORT, () =>
  console.log(`
  Server running on port ${PORT}
  Swagger UI: http://localhost:${PORT}/docs
`),
)
