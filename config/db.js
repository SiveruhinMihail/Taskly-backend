const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    try { 
      await mongoose.connect(`mongodb://localhost:27017?authSource=admin`)
    } catch {
      await mongoose.connect(
        `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongodb:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authSource=admin`,
      )
    }
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  }
}

module.exports = connectDB
