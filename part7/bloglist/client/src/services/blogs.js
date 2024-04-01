import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const config = () => ({
  headers: {
    Authorization: token,
  },
})

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (blogObject) => {
  const response = await axios.post(baseUrl, blogObject, config())
  return response.data
}

const update = async (blogObject) => {
  const response = await axios.put(`${baseUrl}/${blogObject.id}`, blogObject)
  return response.data
}

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config())
  return response.data
}

const createComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
  return response.data
}

const deleteCommentById = async (blogId, commentId) => {
  const response = await axios.delete(
    `${baseUrl}/${blogId}/comments/${commentId}`
  )
  return response.data
}

export default {
  getAll: getAll,
  getById: getById,
  create: create,
  setToken: setToken,
  update: update,
  deleteBlog: deleteBlog,
  createComment: createComment,
  deleteCommentById: deleteCommentById,
}
