import { withSSRGuest } from '../utils/withSSRGuest'
import styles from './splash.module.scss'

export default function Splash() {
  return (
    <div className={styles.container}>
      <img src="/images/logo.svg" alt="logo" />
    </div>
  )
}



export const getServerSideProps = withSSRGuest(async (ctx) => {

  return {
    redirect: {
      destination: '/signin',
      permanent: false
    }
  }
})