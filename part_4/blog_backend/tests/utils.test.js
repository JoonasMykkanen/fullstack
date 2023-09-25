const listHelper = require('../utils/list_helper')

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
		likes: 15
	},
	{
		title: 'Third Blog',
		author: 'Sam Adams',
		url: 'http://example.com/third-blog',
		likes: 10
	}
]

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe('totalikes', () => {
	test('total likes calculate correct sum for empty array', () => {
		const blogs = []

		const result = listHelper.totalLikes(blogs)
		expect(result).toBe(0)
	})

	test('total likes with three arrays', () => {
		const result = listHelper.totalLikes(blogsSample)
		expect(result).toBe(30)
	})
})