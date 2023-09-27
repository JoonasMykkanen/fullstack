const supertest = require('supertest')
const User = require('../models/user')
const mongoose = require('mongoose')
const helper = require('./helper')
const bcrypt = require('bcrypt')
const app = require('../app')

const api = supertest(app)

const testUser1 = {
	username: 'jmykkane',
	name: 'Joonas Mykkänen',
	password: 'Salainen',
}

const testUser2 = {
	invalidfield1: 'asdasd',
	invalidfield2: 'asdasd',
	invalidfield3: 'asdasd',
	invalidfield4: 'asdasd',
	invalidfield5: 'asdasd',
}

const testUser3 = {
	username: 'root',
	name: 'This already exists',
	password: 'Salainen',
}

beforeEach(async () => {
	await User.deleteMany({})

	const passwordHash = await bcrypt.hash('sekret', 10)
	const user = new User({ username: 'root', name: 'admin', passwordHash })

	await user.save()
})

describe('USER POST', () => {
	test('user creation with valid info', async () => {
		const userAtStart = await helper.usersInDb()

		await api
			.post('/api/users')
			.send(testUser1)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const userAtEnd = await helper.usersInDb()
		expect(userAtEnd).toHaveLenght(userAtStart.length + 1)

		const usernames = userAtEnd.map(u => u.username)
		expect(usernames).toContain(testUser1.username)
	})

	test('user creation with invalid info', async () => {
		const userAtStart = await helper.usersInDb()

		await api
			.post('/api/users')
			.send(testUser2)
			.expect(400)

		const userAtEnd = await helper.usersInDb()
		expect(userAtEnd).toHaveLenght(userAtStart.length)

		const usernames = userAtEnd.map(u => u.username)
		expect(usernames).not.toContain(testUser2.username)
	})

	test('test with already existing name', async () => {
		const userAtStart = await helper.usersInDb()

		await api
			.post('/api/users')
			.send(testUser3)
			.expect(400)

		const userAtEnd = await helper.usersInDb()
		expect(userAtEnd).toHaveLenght(userAtStart.length)
	})
})

describe('USER GET', () => {
	test('check that all are returned', async () => {
		const response = await api.get('/api/users')
		expect(response.body).toHaveLength(1)
	})

	test('return if db is empty', async () => {
		await User.deleteMany({})

		const response = await api.get('/api/users')
		expect(response.body).toHaveLength(0)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})