import axios from 'axios'

const config = {
  baseURL: 'http://localhost:8081',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
}

const call = axios.create(config)
export default call
