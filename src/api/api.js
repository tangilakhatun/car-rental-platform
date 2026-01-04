
import axios from 'axios'

const base = import.meta.env.VITE_API_BASE || 'https://car-rental-server-side.vercel.app'

const api = axios.create({
  baseURL: base,
  headers: {
    
    'Cache-Control': 'no-cache',
   
    'Content-Type': 'application/json'
  }
})

export default api
