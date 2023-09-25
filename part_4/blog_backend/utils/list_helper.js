const dummy = (blogs) => {
	console.log(blogs)
	return 1
}

const totalLikes = (blogs) => {
	const sum = blogs.reduce(function(sum, blog) {
		return sum + blog.likes
	}, 0)
	return sum
}

module.exports = {
	totalLikes,
	dummy
}