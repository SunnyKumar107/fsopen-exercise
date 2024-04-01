import propTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    border: '1px solid black',
    margin: '5px 0',
    padding: '5px',
  }

  return (
    <NavLink to={`/blogs/${blog.id}`}>
      <div style={blogStyle} className="blog">
        {blog.title} <b>{blog.author}</b>
      </div>
    </NavLink>
  )
}

Blog.propTypes = {
  blog: propTypes.object.isRequired,
}

export default Blog
