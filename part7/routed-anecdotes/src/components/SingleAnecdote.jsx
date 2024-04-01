import React from 'react'
import { useParams } from 'react-router-dom'

const SingleAnecdote = ({ anecdotes }) => {
  const id = Number(useParams().id)
  const anecdoteById = anecdotes.find((anecdote) => anecdote.id === id)

  return (
    <div>
      <h1>
        {anecdoteById.content} by {anecdoteById.author}
      </h1>
      <p>has vote: {anecdoteById.votes}</p>
      <p>
        for more info see: <a href={anecdoteById.info}>{anecdoteById.info}</a>
      </p>
    </div>
  )
}

export default SingleAnecdote
