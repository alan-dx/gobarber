import { createContext, ReactNode, useCallback, useState } from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'
import { api } from '../services/api'

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

interface User {
  email: string;
  roles: string[];
  permissions: string[]
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  destroyCookie(undefined, '@gobarber.token')
  destroyCookie(undefined, '@gobarber.refreshToken')

  Router.push('/signin')
}

export function AuthProvider({children}: AuthProviderProps) {

  const [user, setUser] = useState<User>(null)

  const signIn = useCallback(async ({email, password}: SignInCredentials) => {

    try {
      const response = await api.post('sessions', {
        email,
        password
      })
  
      const { token, refreshToken, permissions, roles } = response.data

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
        roles,
        permissions
      })

      api.defaults.headers["Authorization"] = `Bearer ${token}`
  
      Router.push("/dashboard")
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