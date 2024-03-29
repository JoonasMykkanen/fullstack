const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
logger.info('Connecting to ', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
	.then(() => { logger.info('Connected to MongoDB')})
	.catch((error) => { logger.error('Error connecting to MongoDB: ', error) })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app