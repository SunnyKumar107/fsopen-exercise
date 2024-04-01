const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const allBlogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    })
    response.status(200).json(allBlogs)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id).populate('comments', {
      comment: 1,
    })
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post(
  '/',
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const body = request.body

      if (!request.user) {
        return response.status(401).json({ error: 'token invalid' })
      }

      const user = request.user

      const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user.id,
      })
      const savedblog = await newBlog.save()
      user.blogs = user.blogs.concat(savedblog._id)
      await user.save()
      return response.status(201).send(newBlog)
    } catch (exception) {
      next(exception)
    }
  }
)

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user
    const id = request.params.id
    const blog = await Blog.findById(id)

    if (!blog) {
      return response.status(404).end()
    }

    if (user._id.toString() === blog.user.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).json(blog)
    }
  }
)

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const id = request.params.id
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
  response.status(202).json(updatedBlog)
})

blogsRouter.get('/:id/comments', async (request, response, next) => {
  try {
    const id = request.params.id
    const comments = await Comment.find({ blog: id })
    console.log(comments)
    response.status(200).json(comments)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const body = request.body
    const id = request.params.id

    const blog = await Blog.findById(id).populate('comments')

    if (!blog) {
      return response.status(400).json({ error: 'blog not found' })
    }

    const newComment = new Comment({
      comment: body.comment,
      blog: id,
    })

    const savedComment = await newComment.save()

    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    response.status(201).send(newComment)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id/comments/:id', async (request, response, next) => {
  try {
    const id = request.params.id
    const comment = await Comment.findById(id)

    if (!comment) {
      response.status(400).json({ error: 'comment not found' })
    }

    await Comment.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
