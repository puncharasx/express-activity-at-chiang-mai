import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Middleware
import LoggerMiddleWare from './middlewares/logger.middleware.js'
import ErrorHandlerMiddleWare from './middlewares/errorHandler.middleware.js'

// Router
import UserRouter from './modules/user/user.router.js'

// Reading env
dotenv.config()

const app = express()

// Use Middleware
app.use(express.json())
app.use(LoggerMiddleWare)


// Use Router
app.use('/user', UserRouter)

app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'API'
  })
})

// Error handler middleware
app.use(ErrorHandlerMiddleWare)

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_DB).then(() => {
  app.listen(PORT, () => {
    console.log(`SERVER RUNNING PORT ${PORT}`)
  })
}).catch((err) => {
  console.log(err.message)
  return 
})

