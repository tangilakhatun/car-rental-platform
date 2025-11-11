
import axios from 'axios'
const base = import.meta.env.VITE_API_BASE || 'http://localhost:3000'
export default axios.create({ baseURL: base })