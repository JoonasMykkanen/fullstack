const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', { title: 1 })
	response.json(users)
})

userRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body

	if (!username || !name || !password) {
		response.status(400).send({ error: 'Required field(s) missing' })
		return
	}

	if (username.length < 3 || password.length < 3) {
		response.status(400).send({ error: 'incomplete user information' })
		return
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({
		username,
		name,
		passwordHash,
	})

	const ret = await user.save()
	response.status(201).json(ret)
})

module.exports = userRouter