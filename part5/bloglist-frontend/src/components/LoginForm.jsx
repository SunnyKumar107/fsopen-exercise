import React, { useState } from 'react'
import Notification from './Notification'

const LoginForm = ({ onLoginHandler, message }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    onLoginHandler({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h1>Log in to application</h1>
      {message && <Notification message={message} />}
      <br />
      <div>
        <form onSubmit={handleLogin}>
          <div>
            username:
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            password:
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button id="login_btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
