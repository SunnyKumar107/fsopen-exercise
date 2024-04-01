import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlog(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return [...state, action.payload]
    },
    deleteBlog(state, action) {
      const id = action.payload

      return state.filter((blog) => blog.id !== id)
    },
    updateBlog(state, action) {
      const id = action.payload
      const blog = state.find((blog) => blog.id === id)
      const voted = { ...blog, likes: blog.likes + 1 }

      return state.map((blog) => (blog.id === voted.id ? voted : blog))
    },
  },
})

export const { setBlog, appendBlog, deleteBlog, updateBlog } = blogSlice.actions

export const intializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlog(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(deleteBlog(id))
  }
}

export const addVote = (blogObject) => {
  return async (dispatch) => {
    const updated = await blogService.update(blogObject)
    dispatch(updateBlog(blogObject.id))
  }
}

export default blogSlice.reducer
