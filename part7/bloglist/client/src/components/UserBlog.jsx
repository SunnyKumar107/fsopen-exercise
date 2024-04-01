import React from 'react'
import { useParams } from 'react-router-dom'

const UserBlog = ({ users }) => {
  const id = useParams().id

  const user = users.find((user) => user.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <div>
        <h2>Added blog</h2>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default UserBlog
