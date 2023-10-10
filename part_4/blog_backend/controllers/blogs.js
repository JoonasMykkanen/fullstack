const middleware = require('../utils/middleware')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
		.populate('user', { username : 1 })
	response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
	const ret = await Blog.findById(request.params.id)
	response.json(ret)
})

blogsRouter.post('/', middleware.userExtractor ,async (request, response) => {
	if (!request.user) {
		return response.status(401).json({ error: 'invalid token' })
	}
	const user = await User.findById(request.user.id)
	const blog = new Blog ({
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes,
		user: user._id
	})

	const ret = await blog.save()
	user.blogs = user.blogs.concat(ret._id)
	await user.save()
	response.status(201).json(ret)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
	const user = await User.findById(request.user.id)
	const blog = await Blog.findById(request.params.id)
	if (!user || !blog) {
		return response.status(404).json({ error: 'User or blog not found' })
	}
	if (request.user.id.toString() !== blog.user.toString()) {
		return response.status(401).json({ error: 'unauthorized' })
	}

	await Blog.deleteOne({ _id: blog.id })
	user.blogs = user.blogs.concat(request.params.id)
	await user.save()
	response.status(204).end()
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (!blog) {
		return response.status(404).json({ error: 'User or blog not found' })
	}
	if (request.user.id.toString() !== blog.user.toString()) {
		return response.status(401).json({ error: 'unauthorized' })
	}

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