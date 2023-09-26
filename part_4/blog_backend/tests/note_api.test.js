const supertest = require('supertest')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const app = require('../app')

const blogsSample = [
	{
		title: 'First Blog',
		author: 'John Doe',
		url: 'http://example.com/first-blog',
		likes: 5
	},
	{
		title: 'Second Blog',
		author: 'Jane Smith',
		url: 'http://example.com/second-blog',
		likes: 10
	},
	{
		title: 'Third Blog',
		author: 'Sam Adams',
		url: 'http://example.com/third-blog',
		likes: 10
	},
	{
		title: 'One being deleted',
		author: 'Joonas Mykkänen',
		url: 'http://example.com/Fourth-blog',
		likes: 7
	}
]

beforeEach(async () => {
	await Blog.deleteMany({})
	console.log('cleared')
	for (let i = 0; i < blogsSample.length; i++) {
		let blogObj = new Blog(blogsSample[i])
		blogsSample[i].id = blogObj.id
		await blogObj.save()
		console.log('saved')
	}
	console.log('done')
})

const api = supertest(app)

describe('GET', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('testing for id field to exits and not _id', async () => {
		const response = await api.get('/api/blogs/')
		expect(response.body[0]._id).not.toBeDefined()
		expect(response.body[0].id).toBeDefined()
	})

	test('check that all are returned', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(blogsSample.length)
	})
})

describe('POST', () => {
	test('valid blog can be added', async () => {
		const newBlog = {
			title: 'New Blog',
			author: 'John Doe',
			url: 'http://example.com/first-blog',
			likes: 5
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs')
		const contents = response.body.map(r => r.title)

		expect(response.body).toHaveLength(blogsSample.length + 1)
		expect(contents).toContain('New Blog')
	})

	test('post without url or title should fail', async () => {
		const invalidBlog = {
			wrongField: 'should not work'
		}

		await api
			.post('/api/blogs')
			.send(invalidBlog)
			.expect(400)

		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(blogsSample.length)
	})

	test('likes has no value', async () => {
		const blogWitoutLikes = {
			title: 'No likes',
			author: 'John Doe',
			url: 'http://example.com/first-blog',
		}

		const response = await api.post('/api/blogs').send(blogWitoutLikes)
		expect(response.body.likes).toBe(0)
	})
})

describe('DELETE', () => {
	test('Delete non existant blog', async () => {
		await api
			.delete('/api/blogs/5f4d5xxxxxa4a4374839ac7a')
			.expect(400)

		const response = await api.get('/api/blogs')
		expect(response.body.length).toBe(blogsSample.length)
	})

	test('access invalid id', async () => {
		await api
			.delete('/api/blogs/12313')
			.expect(400)
	})

	test('deleting existing entry', async () => {
		const blogId = '/api/blogs/' + blogsSample[3].id
		await api
			.delete(blogId)
			.expect(204)

		const response = await api.get('/api/blogs')
		expect(response.body.length).toBe(blogsSample.length - 1)
		const contents = response.body.map(r => r.title)
		expect(contents).not.toContain('One being deleted')
	})
})

describe('PUT', () => {
	const updatedBlog = {
		title: 'Newly updated blog',
		author: 'John Doe',
		url: 'http://example.com/first-blog',
		likes: 5
	}

	test('update non existant entry', async () => {
		await api
			.put('/api/blogs/5f4xxxxx02a4a4374839ac7a')
			.send(updatedBlog)
			.expect(400)
	})

	test('access invalid id', async () => {
		await api
			.put('/api/blogs/12313')
			.send(updatedBlog)
			.expect(400)
	})

	test('normal update', async () => {
		const blogId = '/api/blogs/' + blogsSample[3].id
		await api
			.put(blogId)
			.send(updatedBlog)
			.expect(201)

		const response = await api.get('/api/blogs')
		const contents = response.body.map(r => r.title)
		expect(contents).toContain('Newly updated blog')
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})