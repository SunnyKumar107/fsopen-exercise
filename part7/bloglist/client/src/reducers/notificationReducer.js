import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayMessage(state, action) {
      return action.payload
    },
    hiddenMessage(state, action) {
      return null
    },
  },
})

export const { displayMessage, hiddenMessage } = notificationSlice.actions

export const setNotification = (message, type, time) => {
  return async (dispatch) => {
    dispatch(displayMessage({ message: message, type: type }))

    setTimeout(() => {
      dispatch(hiddenMessage())
    }, 1000 * time)
  }
}

export default notificationSlice.reducer
