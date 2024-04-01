import { useEffect, useRef } from 'react'
import './app.css'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import {
  addVote,
  createBlog,
  intializeBlogs,
  removeBlog,
} from './reducers/blogReducer'
import { initializeUser, login, logout } from './reducers/loginReducer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Users from './components/Users'
import Navbar from './components/Navbar'
import { initializeUsers } from './reducers/usersReducer'
import UserBlog from './components/UserBlog'
import BlogDetail from './components/BlogDetail'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)

  const TogglableRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(intializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogin = async (userObject) => {
    try {
      dispatch(
        login({
          username: userObject.username,
          password: userObject.password,
        })
      )

      dispatch(setNotification('Login successfully!', 'success', 3))
    } catch (error) {
      dispatch(setNotification('Wrong username or password!', 'error', 5))
    }
  }

  const handleLogout = () => {
    dispatch(logout())

    dispatch(setNotification('Logout successfully!', 'success', 3))
  }

  const addBlog = async (blogObject) => {
    try {
      dispatch(
        createBlog({
          title: blogObject.title,
          author: blogObject.author,
          url: blogObject.url,
        })
      )
      dispatch(
        setNotification(
          `A new blog  ${newBlog.title} by ${newBlog.author}`,
          'success',
          3
        )
      )
      TogglableRef.current.toggleVisible()
    } catch (error) {
      dispatch(setNotification('Create new blog failed!', 'error', 3))
    }
  }

  const handleUpdateBlog = async (blogObject) => {
    try {
      dispatch(addVote(blogObject))
      dispatch(setNotification(`You voted ${blogObject.title}`, 'success', 3))
    } catch (error) {
      dispatch(setNotification('Update blog failed!', 'error', 3))
    }
  }

  const handleDeleteBlog = async (blogObject) => {
    const isDelete = window.confirm(
      `Remove ${blogObject.title} by ${blogObject.author}`
    )
    if (isDelete) {
      try {
        dispatch(removeBlog(blogObject.id))
        dispatch(
          setNotification(
            `Removed blog ${blogObject.title} by ${blogObject.author}`,
            'success',
            3
          )
        )
      } catch (error) {
        dispatch(setNotification('Failed delete blog!', 'error', 3))
      }
    }
  }

  const Home = () => {
    return (
      <>
        <Togglable buttonLabel="Create new blog" ref={TogglableRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>

        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </>
    )
  }

  if (!user) {
    return (
      <>
        <Notification />
        <LoginForm onLoginHandler={handleLogin} />
      </>
    )
  }

  return (
    <div>
      <Router>
        <Navbar user={user} onHandleLogout={handleLogout} />
        <Notification />
        <h1>Blog app</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users users={users} />} />
          <Route
            path="/blogs"
            element={blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          />
          <Route path="/users/:id" element={<UserBlog users={users} />} />
          <Route
            path="/blogs/:id"
            element={
              <BlogDetail
                blogs={blogs}
                user={user}
                onHandleUpdateBlog={handleUpdateBlog}
                onHandleDeleteBlog={handleDeleteBlog}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
