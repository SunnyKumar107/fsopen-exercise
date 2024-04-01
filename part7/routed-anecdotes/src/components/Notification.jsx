import React from 'react'

const Notification = ({ notification }) => {
  const notificationStyle = {
    border: 'solid',
    color: notification && notification.type === 'success' ? 'green' : 'red',
    fontSize: '25px',
    padding: '10px 30px',
  }

  if (notification) {
    return <div style={notificationStyle}>{notification.msg}</div>
  }
}

export default Notification
