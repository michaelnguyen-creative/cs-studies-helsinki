const mongoose = require('mongoose')
const app = require('./server/app.js')
const config = require('./server/utils/config.js')

const startServer = async () => {
  console.log('connecting to MongoDB at', config.MONGODB_URI)
  try {
    await mongoose.connect(config.MONGODB_URI)
    console.log('connected to MongoDB')
  } catch (error) {
    console.log('MongoDB connection error:', error.message)
  }

  app.listen(config.PORT, () => {
    console.log(`Server's running on port ${config.PORT}`)
  })
}

startServer()


