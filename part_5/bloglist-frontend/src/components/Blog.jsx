import blogService from '../services/blogs'
import { useState } from 'react'

// Render the list of blogs
const Blogs = ({ blogs }) => (
	<div>
    	{blogs.map( (element, id) => {
        return <div key={id}> {element.title} {element.author} </div>
      })}
	</div>  
)

// Form to create new blogs
const NewBlogForm = ({ handleNewBlogForm, setAuthor, setTitle, setUrl, title, author, url }) => {

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleNewBlogForm}>
        Title
        <input
          type='text'
          value={title}
          name='title'
          onChange={({ target }) => setTitle(target.value)}/>
        Author
        <input
          type='text'
          value={author}
          name='author'
          onChange={({ target }) => setAuthor(target.value)}/>
        url
        <input
          type='text'
          value={url}
          name='url'
          onChange={({ target }) => setUrl(target.value)}/>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

// Main view of path /blogs when user is logged in
const BlogView = ({ blogs, setBlogs, errorMessage, successMessage }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  // Handles new blog form
  const handleNewBlogForm = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    
    try {
      const response = await blogService.create(newBlog)
      setBlogs([...blogs, response])
      successMessage('New blog created')
      setAuthor('')
      setTitle('')
      setUrl('')
    } catch(exception) {
      errorMessage('Creation of blog failed')
      console.log('Error: ', exception)
    }
  }

  return (
  <>
    <div>
      <NewBlogForm
        handleNewBlogForm={handleNewBlogForm}
        setAuthor={setAuthor}
        setTitle={setTitle}
        setUrl={setUrl}
        title={title}
        author={author}
        url={url}
      />
    </div>
    <div>
      <Blogs
        blogs={blogs}
      />
    </div>
  </>
  )
}

export default BlogView