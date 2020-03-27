import axios from 'axios'

const api = axios.create({
    baseURL: process.env.BACKEND || 'http://localhost:3333',
})

export default api