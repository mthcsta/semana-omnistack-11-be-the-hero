import axios from 'axios'

let baseURL;

if('__BASE_URL__' in this)
    baseURL = this.__BASE_URL__
else
    baseURL = 'http://localhost:3333'


const api = axios.create({ baseURL })

export default api