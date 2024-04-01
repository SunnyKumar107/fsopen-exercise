import axios from 'axios'

const baseUrl = '/api/login'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

// const loginUser = (credentials) => {
//   const request = axios.post(baseUrl, credentials);
//   return request.then((res) => res.data);
// };

export default {
  login: login,
}
