import axios from 'axios'

export const api = axios.create({
    url: import.meta.env.VITE_API_URL,
    
    withCredentials: true
})