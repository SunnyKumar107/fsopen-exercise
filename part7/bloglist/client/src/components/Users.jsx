import React from 'react'
import { NavLink } from 'react-router-dom'

const Users = ({ users }) => {
  if (!users) {
    return null
  }

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <NavLink to={`/users/${user.id}`}>{user.name}</NavLink>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
