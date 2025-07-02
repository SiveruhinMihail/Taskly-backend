const mongoose = require('mongoose')
const PORT = 'localhost:27017'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log(`MongoDB подключён на mongodb://${PORT}`)
  } catch (err) {
    console.error('Ошибка подключения к MongoDB:', err)
    process.exit(1)
  }
}

module.exports = connectDB
