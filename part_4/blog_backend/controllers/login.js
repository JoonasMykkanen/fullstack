const loginRouter = require('express').Router()
const config = require('../utils/config')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (request, response) => {
	const { username, password } = request.body
	if (!username || !password) {
		return response.status(400).json({ error: 'invalid username or password' })
	}
	const user = await User.findOne({ username })
	const passwordCorrect = user === null
		? false
		: await bcrypt.compare(password, user.passwordHash)

	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: 'invalid username or password'
		})
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	}

	const token = jwt.sign(userForToken, config.SECRET)

	response
		.status(200)
		.send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter