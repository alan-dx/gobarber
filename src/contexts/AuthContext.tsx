import { createContext, ReactNode, useCallback, useEffect, useState } from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'
import decode from 'jwt-decode'
import { api } from '../services/api'
import { nextApi } from '../services/nextApi'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOutMemo: () => void;
  user: User
}

interface SignInCredentials {
  email: string;
  password: string;
}

export interface User {
  email?: string;
  roles?: string[];
  name?: string;
  image?: string
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  destroyCookie(undefined, '@gobarber.token', {
    path: '/'
  })
  destroyCookie(undefined, '@gobarber.refreshToken', {
    path: '/'
  })

  Router.push('/signin')
}

export function AuthProvider({children}: AuthProviderProps) {

  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    const { '@gobarber.token': token } = parseCookies()

   if (token) {
    console.log('effect')
     
    const { sub } = decode<{ sub: string }>(token)

    nextApi.get('users', {
      params: {
        email: sub
      }
    }).then(response => {
      const { image, email, name, roles } = response.data.user
      console.log('effect')

      setUser({
        email,
        image,
        name,
        roles
      })

    }).catch(err => {
      signOut()
    })
   }
 
  }, [])

  const signOutMemo = useCallback(() => {
    signOut()
  }, [])

  const signIn = useCallback(async ({email, password}: SignInCredentials) => {

    try {
      const response = await api.post('sessions', {
        email,
        password
      })

      //TEM QUE FAZER O SETUPAPICLINET

      const faunaResponse = await nextApi.post('users', {
        email
      })

      const { roles, name, image } = faunaResponse.data.user
  
      const { token, refreshToken } = response.data

      setCookie(undefined, 
        "@gobarber.token",
        token,
        {
          maxAge: 60 * 60 * 24 * 30,
          path: '/'
        }
      )

      setCookie(undefined,
        "@gobarber.refreshToken",
        refreshToken,
        {
          maxAge: 60 * 60 * 24 * 30,
          path: '/'
        }
      )
  
      setUser({
        email,
        image,
        name,
        roles
      })

      api.defaults.headers["Authorization"] = `Bearer ${token}`
  
      Router.push(`/dashboard/${roles[0]}`)
    } catch (error) {
      console.log(error)
      alert('Ops! Tivemos um problema, tente novamente em alguns minutos.')
    }

  }, [])

  return (
    <AuthContext.Provider value={{signIn, signOutMemo, user}}>
      {children}
    </AuthContext.Provider>
  )
}