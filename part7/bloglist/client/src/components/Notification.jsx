import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const msgStyle = {
    background: 'lightgrey',
    padding: '0 10px',
    borderStyle: 'solid',
    borderRadius: 5,
    color: notification && notification.type === 'error' ? 'red' : 'green',
    fontSize: '30px',
    fontWeight: '400',
    marginBottom: '10',
  }

  if (notification) {
    return (
      <div className="msg" style={msgStyle}>
        {notification.message}
      </div>
    )
  }
}

export default Notification
