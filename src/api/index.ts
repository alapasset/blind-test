import axios from 'axios'

const config = {
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: { Accept: 'application/json' }
}

const call = axios.create(config)
export default call
