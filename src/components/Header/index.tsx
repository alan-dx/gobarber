import Link from 'next/link'
import styles from './header.module.scss'
import { FiPower, FiUser } from 'react-icons/fi'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

export function Header() {

  const { signOut, user } = useContext(AuthContext)

  return (
    <header className={styles.container} >
      <div className={styles.headerContent}>
        <div className={styles.logoBox}>
          <img src="/images/logo.svg" alt="logo" />
        </div>
        <nav>
          <Link href="/me">
            <div className={styles.userInfo}>
                {user?.avatar
                  ? 
                  (<img src={`${user?.avatar}`} alt="user" />)
                  :
                  (
                    <div className={styles.withoutAvatar}>
                      <FiUser color="#999591" size={25} />
                    </div>
                  )
                }
              <p>Bem Vindo, <br/>
              <strong>{user?.name}</strong>
              </p>
            </div>
          </Link>
          <button onClick={() => signOut()}>
            <FiPower color="#999591" size={20} />
          </button>
        </nav>
      </div>
    </header>
  )
}