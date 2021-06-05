import { parseCookies } from 'nookies';
import axios from 'axios'

let cookies = parseCookies()

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['@gobarber.token']}`
  }
})