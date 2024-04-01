import React from 'react'
import propTypes from 'prop-types'

const Notification = ({ message }) => {
  const msgStyle = {
    background: 'lightgrey',
    padding: '0 10px',
    borderStyle: 'solid',
    borderRadius: 5,
    color: message && message.type === 'error' ? 'red' : 'green',
    fontSize: '30px',
    fontWeight: '400',
    marginBottom: '10',
  }

  return (
    <div className="msg" style={msgStyle}>
      {message.msg}
    </div>
  )
}

Notification.propTypes = {
  message: propTypes.object.isRequired,
}

export default Notification
