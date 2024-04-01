import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const commentSlice = createSlice({
  name: 'comment',
  initialState: [],
  reducers: {
    setComment(state, action) {
      return action.payload
    },
    appendComment(state, action) {
      return [...state, action.payload]
    },
    removeComment(state, action) {
      const id = action.payload
      return state.filter((comment) => comment.id !== id)
    },
  },
})

export const { setComment, appendComment, removeComment } = commentSlice.actions

export const initializeComment = (id) => {
  return async (dispatch) => {
    const blog = await blogService.getById(id)
    dispatch(setComment(blog.comments))
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const newComment = await blogService.createComment(id, comment)
    dispatch(appendComment(newComment))
  }
}

export const deleteComment = (blogId, commentId) => {
  return async (dispatch) => {
    await blogService.deleteCommentById(blogId, commentId)
    dispatch(removeComment(commentId))
  }
}

export default commentSlice.reducer
