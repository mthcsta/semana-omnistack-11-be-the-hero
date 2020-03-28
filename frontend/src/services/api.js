import axios from 'axios'

const api = axios.create({
    baseURL: typeof __BASE_URL__ == "string" ? __BASE_URL__ : 'http://localhost:3333',
})

export default api