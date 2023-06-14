import axios from 'axios'

const baseURL = process.env.REACT_APP_BACKEND_URL || '/api/persons'
const api = axios.create({ baseURL })

const getAll = () => api.get('/').then((response) => response.data)

const create = (newObject) =>
  api.post('/', newObject).then((response) => response.data)

const remove = (id) =>
  api
    .delete(`/${id}`)
    .then(() => console.log(`deleted contact ${id}`))

const update = (id, newObject) =>
  axios.put(`/${id}`, newObject).then((response) => response.data)

export default {
  getAll,
  create,
  remove,
  update,
}
