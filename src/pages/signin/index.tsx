import { Input } from '../../components/Input'
import styles from './signin.module.scss'
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi'
import { ActionButton } from '../../components/ActionButton'

export default function SignIn() {
  return (
    <div className={styles.container} >
      <div className={styles.signInBox} >
        <img src="/images/logo.svg" alt="logo" />
        <h1>Faça seu login</h1>
        <div className={styles.inputsBox}>
          <Input placeholder="E-mail" icon={<FiMail color="#666360" size={18} />} />
          <Input placeholder="Senha" icon={<FiLock color="#666360" size={18} />} />
        </div>
        <ActionButton />
        <a href="/">Esqueci minha senha</a>
        <div>
          <FiLogIn color="#FF9000" size={18} />
          <a href="/">Criar conta</a>
        </div>
      </div>
      <img src="/images/signin-hero.svg" alt="hero" />
    </div>
  )
}''