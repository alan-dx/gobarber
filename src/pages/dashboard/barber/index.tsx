import { GetServerSideProps } from "next"
import Router from "next/router"
import { parseCookies } from "nookies"
import { useContext, useEffect } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import { api } from "../../../services/api"
import { withSSRAuth } from "../../../utils/withSSRAuth"

export default function Dashboard() {
  
  const { user } = useContext(AuthContext)

  return (
    <p>Dashboard Barbeiro, {user?.email}</p>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

  return {
    props: {

    }
  }
})