import Router from "next/router"
import { useContext, useEffect } from "react"
import { Header } from "../../../components/Header"
import { AuthContext } from "../../../contexts/AuthContext"
import validatePermissions from "../../../utils/validatePermissions"
import { withSSRAuth } from "../../../utils/withSSRAuth"

export default function Dashboard() {
  
  const { user } = useContext(AuthContext)

  useEffect(() => {

    if (user) {
      const userHasPermissions = validatePermissions({
        roles: ['client'],
        user
      })
  
      if (!userHasPermissions) {
        Router.push(`${user?.roles[0]}`)
      }
    }
    
  }, [user])

  return (
    <Header />
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

  console.log('eu sou um usuário autenticado')

  return {
    props: {

    }
  }
})