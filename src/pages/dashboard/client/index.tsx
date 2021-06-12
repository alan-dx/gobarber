import { getSession } from "next-auth/client"
import Router from "next/router"
import { useContext, useEffect } from "react"
import { Header } from "../../../components/Header"
import { AuthContext } from "../../../contexts/AuthContext"
import validatePermissions from "../../../utils/validatePermissions"
import { withSSRAuth } from "../../../utils/withSSRAuth"

interface DashboardBarberProps {
  userOAuth: {
    name: string,
    email: string,
    image: string;
    roles?:string[]
  } 
}

export default function DashboardClient({userOAuth}:DashboardBarberProps) {
  
  const { user } = useContext(AuthContext)

  useEffect(() => {

    if (user || userOAuth) {
      const userHasPermissions = validatePermissions({
        roles: ['client'],
        user: user || userOAuth
      })
  
      if (!userHasPermissions) {
        Router.push(`${user?.roles[0] || userOAuth.roles[0]}`)
      }
    }
    
  }, [user, userOAuth])

  return (
    <Header userOAuth={userOAuth} />
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

  const session = await getSession(ctx) as any
  
  if (session) {
    const userOAuth = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      roles: session.userData.data.roles
    }
  
    return {
      props: {
        userOAuth
      }
    }
  }

  return {
    props: {

    }
  }
})

