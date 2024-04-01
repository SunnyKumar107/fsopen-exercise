import React from 'react'
import propTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const Navbar = ({ user, onHandleLogout }) => {
  const handleLogout = () => {
    onHandleLogout()
  }

  return (
    <div>
      <NavLink to="/">Home </NavLink>
      <NavLink to="/users"> users </NavLink>
      <NavLink to="/blogs"> blogs</NavLink>
      <span>
        {' '}
        {user.name} logged-in{' '}
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </span>
    </div>
  )
}

Navbar.propTypes = {
  user: propTypes.object.isRequired,
  onHandleLogout: propTypes.func.isRequired,
}

export default Navbar
