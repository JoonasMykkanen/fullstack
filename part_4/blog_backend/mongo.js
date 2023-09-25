const config = require('./utils/config')
const Blog = require('./models/blog')
const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

mongoose.connect(config.MONGODB_URI)

Blog.find({}).then(result => {
	result.forEach(blog => {
		console.log(blog)
	})
	mongoose.connection.close()
})