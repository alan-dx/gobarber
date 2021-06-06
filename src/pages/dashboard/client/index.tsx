import { GetServerSideProps } from "next"
import Router from "next/router"
import { parseCookies } from "nookies"
import { useContext, useEffect } from "react"
import { Header } from "../../../components/Header"
import { AuthContext } from "../../../contexts/AuthContext"
import { withSSRAuth } from "../../../utils/withSSRAuth"

export default function Dashboard() {
  
  const { user } = useContext(AuthContext)

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
},{
  roles: ['client']
})