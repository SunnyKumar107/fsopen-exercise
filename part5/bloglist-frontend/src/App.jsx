import { useState, useEffect, useRef } from 'react'
import './app.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import UserInfo from './components/UserInfo'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  const TogglableRef = useRef()
  console.log(TogglableRef)

  const showMessage = (msg, type) => {
    setMessage({
      msg,
      type,
    })

    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const sortBlog = () => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }

  const handleLogin = async (userObject) => {
    try {
      const User = await loginService.login({
        username: userObject.username,
        password: userObject.password,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(User))

      blogService.setToken(User.token)
      setUser(User)
      showMessage('Login successfully!', 'success')
    } catch (error) {
      showMessage('Wrong username or password!', 'error')
    }
  }

  useEffect(() => {
    sortBlog()

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const User = JSON.parse(loggedUserJSON)
      setUser(User)
      blogService.setToken(User.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    // window.localStorage.clear();
    location.reload()

    showMessage('Logout successfully!', 'success')
  }

  const addBlog = async (blogObject) => {
    TogglableRef.current.toggleVisible()
    try {
      const newBlog = await blogService.create({
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
      })
      sortBlog()

      showMessage(
        `A new blog  ${newBlog.title} by ${newBlog.author}`,
        'success'
      )
    } catch (error) {
      showMessage('Create new blog failed!', 'error')
    }
  }

  const handleUpdateBlog = async (id, blogObject) => {
    try {
      await blogService.update(id, blogObject)
      sortBlog()
    } catch (error) {
      showMessage('Update blog failed!', 'error')
    }
  }

  const handleDeleteBlog = async (id, blogObject) => {
    try {
      const isDelete = window.confirm(
        `Remove ${blogObject.title} by ${blogObject.author}`
      )

      if (isDelete) {
        await blogService.deleteBlog(id)
        sortBlog()

        showMessage(
          `Removed blog ${blogObject.title} by ${blogObject.author}`,
          'success'
        )
      }
    } catch (error) {
      showMessage('Failed delete blog!', 'error')
    }
  }

  if (!user) {
    return <LoginForm onLoginHandler={handleLogin} message={message} />
  }

  return (
    <div>
      <div>
        {message && <Notification message={message} />}
        <h1>Blogs</h1>
        <UserInfo user={user} onHandleLogout={handleLogout} />
      </div>

      <Togglable buttonLabel="Create new blog" ref={TogglableRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          onHandleUpdateBlog={handleUpdateBlog}
          onHandleDeleteBlog={handleDeleteBlog}
        />
      ))}
    </div>
  )
}

export default App
