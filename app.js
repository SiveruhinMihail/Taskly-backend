const express = require('express')

const swaggerUi = require('swagger-ui-express')
const specs = require('./config/swagger')

const connectDB = require('./config/db')
const authRoutes = require('./routes/auth.routes')

const PORT = 3000

const app = express()

app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Привет, мир! �')
})

connectDB()

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs))

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
