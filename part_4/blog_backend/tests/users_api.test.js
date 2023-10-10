const supertest = require('supertest')
const User = require('../models/user')
const mongoose = require('mongoose')
const helper = require('./helper')
const bcrypt = require('bcrypt')
const app = require('../app')

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

const testUser4 = {
	username: 'a',
	name: 'This already exists',
	password: 'Salainen',
}

beforeEach(async () => {
	await User.deleteMany({})
	console.log('cleared')
	const passwordHash = await bcrypt.hash('sekret', 10)
	const user = new User({ username: 'root', name: 'admin', passwordHash })
	console.log('saved')
	await user.save()
	console.log('done')
})

const api = supertest(app)

describe('USER POST', () => {
	test('test with already existing name', async () => {
		const userAtStart = await helper.usersInDb()

		await api
			.post('/api/users')
			.send(testUser3)
			.expect(400)

		const userAtEnd = await helper.usersInDb()
		expect(userAtEnd).toHaveLength(userAtStart.length)
	})

	test('test with too short name and passwd', async () => {
		const userAtStart = await helper.usersInDb()

		await api
			.post('/api/users')
			.send(testUser4)
			.expect(400)

		const userAtEnd = await helper.usersInDb()
		expect(userAtEnd).toHaveLength(userAtStart.length)
	})

	test('user creation with invalid info', async () => {
		const userAtStart = await helper.usersInDb()

		await api
			.post('/api/users')
			.send(testUser2)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const userAtEnd = await helper.usersInDb()
		expect(userAtEnd).toHaveLength(userAtStart.length)

		const usernames = userAtEnd.map(u => u.username)
		expect(usernames).not.toContain(testUser2.username)
	})

	test('user creation with valid info', async () => {
		const userAtStart = await helper.usersInDb()

		await api
			.post('/api/users')
			.send(testUser1)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const userAtEnd = await helper.usersInDb()
		expect(userAtEnd).toHaveLength(userAtStart.length + 1)

		const usernames = userAtEnd.map(u => u.username)
		expect(usernames).toContain(testUser1.username)
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