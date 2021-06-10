import Router from "next/router"
import { useContext, useEffect } from "react"
import { Header } from "../../../components/Header"
import { AuthContext } from "../../../contexts/AuthContext"
import validatePermissions from "../../../utils/validatePermissions"
import { withSSRAuth } from "../../../utils/withSSRAuth"
import styles from './barber.module.scss'

export default function Dashboard() {
  
  const { user } = useContext(AuthContext)

  useEffect(() => {

    if (user) {
      const userHasPermissions = validatePermissions({
        roles: ['barber'],
        user
      })
  
      if (!userHasPermissions) {
        Router.push(`${user?.roles[0]}`)
      }
    }
    
  }, [user])

  return (
    <>
      <Header />
      <div className={styles.container} >
        <main>
          <h1>Horários agendados</h1>
        </main>
        <aside>
          <div className={styles.calenderBox}>
            <p>AAA</p>
          </div>
        </aside>
      </div>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

  //DA PRA USAR O GETSESSION AQ

  return {
    props: {

    }
  }
})