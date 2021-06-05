import { AuthTokenError } from './errors/AuthTokenError';
import { parseCookies, setCookie } from 'nookies';
import axios, { AxiosError } from 'axios'
import { signOut } from '../contexts/AuthContext';

let cookies = parseCookies()

let isRefreshing = false
let failedRequestQueue = []

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['@gobarber.token']}`
  }
})

api.interceptors.response.use(response => {
  return response
}, (error: AxiosError) => {
  if (error.response.status === 401) {
    if (error.response.data?.code === 'token.expired') {
      cookies = parseCookies()
      const { '@gobarber.resfreshToken': refreshToken } = cookies
      console.log(refreshToken)

      const originalConfig = error.config

      if (!isRefreshing) {
        isRefreshing = true

        api.post('/refresh', {
          refreshToken
        }).then(response => {
          const { token } = response.data

          setCookie(undefined, "@gobarber.token", token,
            {
              nextAge: 60 * 60 * 24 * 30,
              path: '/'
            }
          )

          setCookie(undefined, "@gobarber.resfreshToken", response.data.refreshToken,
            {
              nextAge: 60 * 60 * 24 * 30,
              path: '/'
            }
          )

          api.defaults.headers['Authorization'] = `Bearer ${token}`

          failedRequestQueue.forEach(request => request.onSuccess(token))
          failedRequestQueue = []

        }).catch((err) => {
          failedRequestQueue.forEach(request => request.onFailure(error))
          failedRequestQueue = []

          if (process.browser) {
            signOut()
          }
        }).finally(() => {
          isRefreshing = false
        })

      }

      return new Promise((resolve, reject) => {
        failedRequestQueue.push({
          onSuccess: (token: string) => {
            originalConfig.headers['Authorization'] = `Bearer ${token}`

            resolve(api(originalConfig))
          },
          onFailure: (error: AxiosError) => {
            reject(error)
          }
        })
      })

    } else {
      if (process.browser) {
        signOut()
      } else {
        Promise.reject(new AuthTokenError())
      }
    }
  }

  return Promise.reject(error)

})