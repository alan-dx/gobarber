import { useState } from 'react'
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi'
import { Input } from '../../components/Input'
import { TimeAvailabilityInput } from '../../components/TimeAvailabilityInput'
import NextLink from 'next/link'
import styles from './signup.module.scss'
import { ActionButton } from '../../components/ActionButton'

export default function SignUp() {

  const [userType, setUserType] = useState(true)

  return (
    <div className={styles.container} >
      <img src="/images/signup-hero.svg" alt="hero" />
      <div className={styles.signUpBox}>
        <img src="/images/logo.svg" alt="logo" />
        <div className={styles.userTypeBox}>
          <button onClick={() => setUserType(true)} className={ userType ? styles.active : ''}>
            Sou Cliente
          </button>
          <button onClick={() => setUserType(false)} className={ !userType ? styles.active : ''} >
            Sou cabeleireiro
          </button>
        </div>
        <div className={styles.inputsBox}>
          <Input
              type="text"
              placeholder="Nome"
              icon={<FiUser color="#666360" size={18} />}
              // errors={errors.email}
              // {...register('email')}
          />
          <Input
              type="email"
              placeholder="E-mail"
              icon={<FiMail color="#666360" size={18} />}
              // errors={errors.email}
              // {...register('email')}
          />
          <Input
              type="password"
              placeholder="Senha"
              icon={<FiLock color="#666360" size={18} />}
              // errors={errors.email}
              // {...register('email')}
          />
          <TimeAvailabilityInput isOpen={!userType} />
        </div>
        <ActionButton type="submit" text="Entrar" />
        <div className={styles.goBack}>
          <FiArrowLeft color="#F4EDE8" size={18} />
          <NextLink href="/signin">Voltar para login</NextLink>
        </div>
      </div>
    </div>
  )
}