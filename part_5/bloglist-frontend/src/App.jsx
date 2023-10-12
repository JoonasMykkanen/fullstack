// CUSTOM COMPONENTS FOR FRONTEND
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogView from './components/Blog'

// LOGIC FOR COMMUNICATING WITH BACKEND
import loginService from './services/login'
import blogService from './services/blogs'

// GENERAL IMPORTS
import { useState, useEffect } from 'react'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [username, setUsername] = useState('') 
	const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
	const [successMessage, setSuccessMessage] = useState(null)

  // Retrieve blogs for first time
 	useEffect(() => {
    blogService.getAll().then(initialBlogs => setBlogs( initialBlogs ))
  },[])
  // Check if user has already valid token in localStorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Handles login form execution, checks with backend
  // and sets user and token to storage if login successfull
	const handleLoginForm = async (event) => {
		event.preventDefault()
		try {
      const user = await loginService.login({ username, password })
      setSuccessMessage('Login OK :)')
      setUser(user)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
    } catch(exception) {
      setErrorMessage('wrong username or password')
      console.log('Error: ', exception)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    setSuccessMessage('Session terminated succesfully!')
  }

  // if not user --> show login form
  // else we will show main page
  return (
    <div>
      <Notification 
        error={errorMessage}
        success={successMessage}
        setError={setErrorMessage}
        setSuccess={setSuccessMessage}
      />
      {!user && 
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLoginForm}
          setUsername={setUsername}
          setPassword={setPassword}
        />}
      {user &&
        <div>
          <h1>blogs</h1>
          <div className='headerLine'>
            <h2>You are logged in as {user.name}</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <BlogView
            blogs={blogs}
            setBlogs={setBlogs}
            errorMessage={setErrorMessage}
            successMessage={setSuccessMessage}
          />
        </div>
      }
    </div>
  )
}

export default App