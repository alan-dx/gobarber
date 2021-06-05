import Router from 'next/router'
import { createContext, ReactNode, useCallback, useState } from 'react'
import { api } from '../services/api'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut?: () => void;
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

export function AuthProvider({children}: AuthProviderProps) {

  const [user, setUser] = useState<User>(null)

  const signIn = useCallback(async ({email, password}: SignInCredentials) => {

    try {
      const response = await api.post('sessions', {
        email,
        password
      })
  
      const { token, refreshToken, permissions, roles } = response.data
  
      setUser({
        email,
        roles,
        permissions
      })
  
      Router.push("/dashboard")
    } catch (error) {
      console.log(error)
    }

  }, [])

  return (
    <AuthContext.Provider value={{signIn, user}}>
      {children}
    </AuthContext.Provider>
  )
}