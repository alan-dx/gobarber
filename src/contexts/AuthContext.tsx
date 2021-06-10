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
  signOut: () => void;
  user: User
}

interface SignInCredentials {
  email: string;
  password: string;
}

export interface User {
  email: string;
  roles?: string[];
  name: string;
  avatar?: string
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  destroyCookie(undefined, '@gobarber.token')
  destroyCookie(undefined, '@gobarber.refreshToken')

  Router.push('/signin')
}

export function AuthProvider({children}: AuthProviderProps) {

  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    const { '@gobarber.token': token } = parseCookies()

   if (token) {
     
    const { sub } = decode<{ sub: string }>(token)

    nextApi.get('users', {
      params: {
        email: sub
      }
    }).then(response => {
      const { avatar, email, name, roles } = response.data.user

      setUser({
        email,
        avatar,
        name,
        roles
      })

    }).catch(err => {
      signOut()
    })
   }
 
  }, [])

  // useEffect(() => {//REMOVER ESSE USEEFFECT E CRIAR UMA ROTA PARA CHAMADA NO FAUNA DB, DENTRO DO WITHSSRAUTH, PARA PEGAR AS ROLES DO USUÁRIO
  //   const { '@gobarber.token': token } = parseCookies()

  //   if (token) {

  //     const {} = decode<>

  //     // api.get('/me')
  //     // .then(response => {
  //     //   const { email, roles } = response.data

  //     //   setUser({
  //     //     email,
  //     //     roles
  //     //   }) 
  //     // })
  //     // .catch(err => {
  //     //   signOut()
  //     // })
  //   }
  // }, [])

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

      console.log(faunaResponse.data.user)

      const { roles, name, avatar } = faunaResponse.data.user
  
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
        "@gobarber.resfreshToken",
        refreshToken,
        {
          maxAge: 60 * 60 * 24 * 30,
          path: '/'
        }
      )
  
      setUser({
        email,
        avatar,
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
    <AuthContext.Provider value={{signIn, signOut, user}}>
      {children}
    </AuthContext.Provider>
  )
}