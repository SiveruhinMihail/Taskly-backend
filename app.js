const express = require('express')
const authRoutes = require('./routes/auth.routes')
const connectDB = require('./config/db')
const swaggerUi = require('swagger-ui-express')
const specs = require('./config/swagger')

const app = express()
const PORT = 3000
app.use(express.json())

// Подключение маршрутов
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Привет, мир! �')
})

// Подключение MongoDB
connectDB()

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`)
})
