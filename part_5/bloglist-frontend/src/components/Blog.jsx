import blogService from '../services/blogs'
import Togglable from './Togglable'
import { useState, useRef } from 'react'

// Render the list of blogs
const Blogs = ({ blogs }) => {
  const [showDetails, setDetails] = useState(false)

  return (
    <div>
        {blogs.map( (element, id) => {
          return (
            <div key={id} className='blogPost'>
              {!showDetails &&
                <div>
                  <span>{element.title} / {element.author}</span>
                  <button onClick={() => setDetails(true)} className='blogPostButton'>view</button>
                </div>}
              {showDetails &&
                <div>
                  <span>{element.title} / {element.author}</span>
                  <button className='blogPostButton'>hide</button>
                  <div className='BlogDetails'>
                    <span className='BlogDetails'>{element.url}</span>
                    <span>{element.likes}</span>
                    <button onClick={() => setDetails(false)} className='blogPostButton'>like</button>
                    <span>{element.user.username}</span>
                  </div>
                </div>
              }
            </div>
          )
        })}
    </div>  
  )
}

// Form to create new blogs
const NewBlogForm = ({
  handleNewBlogForm,
  setAuthor,
  setTitle,
  setUrl,
  title,
  author,
  url,
}) => {
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
  const blogFormRef = useRef()

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
      blogFormRef.current.toggleVisibility()
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
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <NewBlogForm
        handleNewBlogForm={handleNewBlogForm}
        setAuthor={setAuthor}
        setTitle={setTitle}
        setUrl={setUrl}
        title={title}
        author={author}
        url={url}
      />
    </Togglable>
    <div>
      <Blogs
        blogs={blogs}
      />
    </div>
  </>
  )
}

export default BlogView