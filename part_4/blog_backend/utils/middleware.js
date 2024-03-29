const jwt = require('jsonwebtoken')
const config = require('./config')
const logger = require('./logger')

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path:  ', request.path)
	logger.info('Body:  ', request.body)
	logger.info('---')
	next()
}

const unknownEndpoint = (request, response, next) => {
	response.status(404).send({ error: 'unknown endpoint' })
	next()
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	} else if (error.name === 'Not Found') {
		return response.status(404).json({ error: error.message })
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(400).json({ error: 'token missing or invalid' })
	}
	next(error)
}

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		request.token = authorization.replace('Bearer ', '')
	}
	next()
}

const userExtractor = (request, response, next) => {
	const decodedToken = jwt.verify(request.token, config.SECRET)
	request.user = decodedToken
	next()
}

module.exports = {
	unknownEndpoint,
	tokenExtractor,
	requestLogger,
	userExtractor,
	errorHandler
}