const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
	const ret = await Blog.findById(request.params.id)
	response.json(ret)
})

blogsRouter.post('/', async (request, response) => {
	const user = await User.findById(request.body.userId)
	const blog = new Blog ({
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes,
		user: user.id
	})

	const ret = await blog.save()
	response.status(201).json(ret)
})

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
	let blogToUpdate = {
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes
	}

	blogToUpdate = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate)
	response.status(201).json(blogToUpdate)
})

module.exports = blogsRouter