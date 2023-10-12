import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch(exception) {
    console.log('Error: ', exception)
  }
}  

const create = async (newBlog) => {
  const config = { headers: { Authorization: token }, }

  try {
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
  } catch(exception) {
    console.log('Error: ', exception)
  }
}

const update = async (id, updatedBlog) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
    return response.data
  } catch(exception) {
    console.log('Error: ', exception)
  }
}

export default {
  setToken,
  update,
  create,
  getAll
}