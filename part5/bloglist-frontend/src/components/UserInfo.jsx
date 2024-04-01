import React from 'react'
import propTypes from 'prop-types'

const UserInfo = ({ user, onHandleLogout }) => {
  const handleLogout = () => {
    onHandleLogout()
  }
  return (
    <div style={{ marginBottom: '20px' }}>
      {user.name} logged-in{' '}
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

UserInfo.propTypes = {
  user: propTypes.object.isRequired,
  onHandleLogout: propTypes.func.isRequired,
}

export default UserInfo
