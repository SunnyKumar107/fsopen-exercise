import propTypes from 'prop-types'
import { useNavigate, useParams } from 'react-router-dom'
import Comment from './Comment'

const BlogDetail = ({
  blogs,
  user,
  onHandleUpdateBlog,
  onHandleDeleteBlog,
}) => {
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)
  const navigate = useNavigate()

  const handleAddLike = () => {
    onHandleUpdateBlog({
      ...blog,
      likes: blog.likes + 1,
    })
  }

  const handleDeleteBlog = () => {
    onHandleDeleteBlog(blog)
    navigate('/')
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <a className="url" href={blog.url}>
        {blog.url}
      </a>
      <div className="likes">
        likes: {blog.likes}{' '}
        <button id="like_btn" onClick={handleAddLike}>
          Like
        </button>{' '}
        <br />
        added by {blog.user.name}
      </div>
      {blog.user.username === user.username && (
        <button
          id="remove_blog_btn"
          onClick={handleDeleteBlog}
          style={{
            backgroundColor: 'blue',
            border: 'none',
            color: 'white',
            padding: '5px 10px',
            marginTop: '10px',
            borderRadius: '3px',
          }}
        >
          Remove
        </button>
      )}
      <Comment user={user} blog={blog} />
    </div>
  )
}

BlogDetail.propTypes = {
  user: propTypes.object.isRequired,
  onHandleUpdateBlog: propTypes.func.isRequired,
  onHandleDeleteBlog: propTypes.func.isRequired,
}

export default BlogDetail
