const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
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
    const blog = await Blog.findById(request.params.id)
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
    user: body.user,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
  response.status(202).json(updatedBlog)
})

module.exports = blogsRouter
