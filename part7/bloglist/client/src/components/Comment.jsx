import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  initializeComment,
  addComment,
  deleteComment,
} from '../reducers/commentReducer'
import { useParams } from 'react-router-dom'

const Comment = ({ blog, user }) => {
  const [commentValue, setCommentValue] = useState('')
  const comments = useSelector((state) => state.comments)
  const dispatch = useDispatch()
  const id = useParams().id

  useEffect(() => {
    dispatch(initializeComment(id))
  }, [dispatch])

  const handleComment = (e) => {
    e.preventDefault()
    const newComment = {
      comment: commentValue,
    }
    dispatch(addComment(id, newComment))
    setCommentValue('')
  }

  return (
    <div>
      <h3>Comments</h3>
      <div>
        <form onSubmit={handleComment}>
          <input
            type="text"
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />
          <button type="submit">add comment</button>
        </form>
      </div>
      {comments.length !== 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              {comment.comment}{' '}
              {user.username === blog.user.username && (
                <button onClick={() => dispatch(deleteComment(id, comment.id))}>
                  delete
                </button>
              )}{' '}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default Comment
