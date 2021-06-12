import Link from 'next/link'
import styles from './header.module.scss'
import { FiPower, FiUser } from 'react-icons/fi'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { signOut } from 'next-auth/client'

interface HeaderProps {
  userOAuth?: {
    name: string,
    email: string,
    image: string;
    roles?:string[]
  } 
}

export function Header({userOAuth}: HeaderProps) {

  const { signOutMemo, user } = useContext(AuthContext)

  return (
    <header className={styles.container} >
      <div className={styles.headerContent}>
        <div className={styles.logoBox}>
          <img src="/images/logo.svg" alt="logo" />
        </div>
        <nav>
          <Link href="/me">
            <div className={styles.userInfo}>
                {user?.image || userOAuth?.image
                  ? 
                  (<img src={`${user?.image || userOAuth?.image}`} alt="user" />)
                  :
                  (
                    <div className={styles.withoutAvatar}>
                      <FiUser color="#999591" size={25} />
                    </div>
                  )
                }
              <p>Bem Vindo, <br/>
              <strong>{user?.name || userOAuth?.name}</strong>
              </p>
            </div>
          </Link>
          <button onClick={() => {
            if (userOAuth) {
              signOut()
            } else if (user) {
              signOutMemo()
            }
          }}>
            <FiPower color="#999591" size={20} />
          </button>
        </nav>
      </div>
    </header>
  )
}