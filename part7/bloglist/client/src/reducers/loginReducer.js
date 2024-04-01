import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'

const loginSlice = createSlice({
  name: 'authentication',
  initialState: null,
  reducers: {
    userInit(state, action) {
      return action.payload
    },
    loginUser(state, action) {
      return action.payload
    },
    logoutUser(state, action) {
      return null
    },
  },
})

export const { userInit, loginUser, logoutUser } = loginSlice.actions

export const initializeUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

  return async (dispatch) => {
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(userInit(user))
      blogService.setToken(user.token)
    }
  }
}

export const login = (authData) => {
  return async (dispatch) => {
    const user = await loginService.login(authData)
    dispatch(loginUser(user))

    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    blogService.setToken(user.token)
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    // window.localStorage.clear();
    dispatch(logoutUser())
    location.reload()
  }
}

export default loginSlice.reducer
