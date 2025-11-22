require('dotenv').config()

const express = require('express')

const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./config/swagger')

const connectDB = require('./config/db')
const authRoutes = require('./routes/auth.routes')

const PORT = process.env.PORT
const cors = require('cors')

const app = express()

app.use(express.json())
connectDB()

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:8080',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://frontend:3000',
      'http://localhost',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'jwt-refresh'],
    credentials: true,
  }),
)

app.use('/api/auth', authRoutes)

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date(),
    database: 'connected',
  })
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(PORT, () =>
  console.log(`
  Server running on port ${PORT}
  Swagger UI: http://localhost:${PORT}/docs
`),
)
