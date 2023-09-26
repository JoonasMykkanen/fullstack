const lodash = require('lodash')

const dummy = () => {
	return 1
}

const totalLikes = (blogs) => {
	const sum = blogs.reduce(function(sum, blog) {
		return sum + blog.likes
	}, 0)
	return sum
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0)
		return 0

	let current = blogs.reduce(function(current, blog) {
		if (blog.likes > current.likes)
			return blog
		else
			return current
	}, blogs[0])

	return current
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0)
		return 0

	const groupedByAuthor = lodash.groupBy(blogs, 'author')
	const transformedOutput = lodash.map(groupedByAuthor, item => ({ author: item[0].author, blogs: item.length }))
	const sortedOutput = lodash.orderBy(transformedOutput, ['blogs'], ['desc'])
	const result = lodash.head(sortedOutput)

	return result
}

const mostLikes = (blogs) => {
	if (blogs.length === 0)
		return 0

	const groupedByAuthor = lodash.groupBy(blogs, 'author')
	const transformedOutput = lodash.map(groupedByAuthor, item => ({
		author: item[0].author, likes: lodash.sumBy(item, 'likes')
	}))
	const sortedOutput = lodash.orderBy(transformedOutput, ['likes'], ['desc'])
	const result = lodash.head(sortedOutput)

	return result
}

module.exports = {
	favoriteBlog,
	totalLikes,
	mostLikes,
	mostBlogs,
	dummy
}