const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
	try {
		const blogs = await Blog.find({})
		response.json(blogs)
	} catch(exception) {
		next(exception)
	}
})

blogsRouter.get('/:id', async (request, response, next) => {
	try {
		const ret = await Blog.findById(request.params.id)
		response.json(ret)
	} catch(exception) {
		next(exception)
	}
})

blogsRouter.post('/', async (request, response, next) => {
	let body = {
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes
	}
	const newBlog = new Blog(body)

	try {
		const ret = await newBlog.save()
		response.status(201).json(ret)
	} catch(exception) {
		next(exception)
	}
})

blogsRouter.delete('/:id', async (request, response, next) => {
	try {
		await Blog.findByIdAndRemove(request.params.id)
		response.status(204).end()
	} catch(exception) {
		next(exception)
	}
})

blogsRouter.put('/:id', async (request, response, next) => {
	let blogToUpdate = {
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes
	}

	try {
		blogToUpdate = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate)
		response.status(201).json(blogToUpdate)
	} catch(exception) {
		next(exception)
	}
})

module.exports = blogsRouter