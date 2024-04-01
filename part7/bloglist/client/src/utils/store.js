import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from '../reducers/notificationReducer'
import blogReducer from '../reducers/blogReducer'
import loginReducer from '../reducers/loginReducer'
import usersReducer from '../reducers/usersReducer'
import commentReducer from '../reducers/commentReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: loginReducer,
    users: usersReducer,
    comments: commentReducer,
  },
})

export default store
