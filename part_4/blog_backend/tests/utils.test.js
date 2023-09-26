const listHelper = require('../utils/list_helper')

const blogs = []

const listOfOne = [
	{
		title: 'only one',
		author: 'Joonas',
		url: 'http//joonas.com/blog',
		likes: 100
	}
]

const retMostBlogsOne = {
	author: 'Joonas',
	blogs: 1
}

const retMostLikesOne = {
	author: 'Joonas',
	likes: 100
}

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
		title: 'Fourth Blog',
		author: 'Sam Adams',
		url: 'http://example.com/Fourth-blog',
		likes: 7
	}
]

const retMostBlogsSample = {
	author: 'Sam Adams',
	blogs: 2
}

const retMostLikesSample = {
	author: 'Sam Adams',
	likes: 17
}



test('dummy returns one', () => {
	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})



describe('totalikes', () => {
	test('total likes calculate correct sum for empty array', () => {
		const result = listHelper.totalLikes(blogs)
		expect(result).toBe(0)
	})

	test('list of one', () => {
		const result = listHelper.totalLikes(listOfOne)
		expect(result).toBe(100)
	})

	test('total likes with three arrays', () => {
		const result = listHelper.totalLikes(blogsSample)
		expect(result).toBe(32)
	})
})



describe('favoriteblog', () => {
	test('empty list', () => {
		const result = listHelper.favoriteBlog(blogs)
		expect(result).toBe(0)
	})
	test('list of one', () => {
		const result = listHelper.favoriteBlog(listOfOne)
		expect(result).toEqual(listOfOne[0])
	})
	test('Longer list', () => {
		const result = listHelper.favoriteBlog(blogsSample)
		expect(result).toEqual(blogsSample[1])
	})
})



describe('most blogs by author', () => {
	test('empty list', () => {
		const result = listHelper.mostBlogs(blogs)
		expect(result).toBe(0)
	})
	test('list of one', () => {
		const result = listHelper.mostBlogs(listOfOne)
		expect(result).toEqual(retMostBlogsOne)
	})
	test('Longer list', () => {
		const result = listHelper.mostBlogs(blogsSample)
		expect(result).toEqual(retMostBlogsSample)
	})
})

describe('most likes by author', () => {
	test('empty list', () => {
		const result = listHelper.mostLikes(blogs)
		expect(result).toBe(0)
	})
	test('list of one', () => {
		const result = listHelper.mostLikes(listOfOne)
		expect(result).toEqual(retMostLikesOne)
	})
	test('Longer list', () => {
		const result = listHelper.mostLikes(blogsSample)
		expect(result).toEqual(retMostLikesSample)
	})
})