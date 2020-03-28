import axios from 'axios'

const api = axios.create({
    baseURL: 'https://be-the-hero-11.herokuapp.com' //'http://192.168.1.71:3333'
})

export default api