import { useState } from 'react'
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi'
import { Input } from '../../components/Input'
import { TimeAvailabilityInput } from '../../components/TimeAvailabilityInput'
import NextLink from 'next/link'
import styles from './signup.module.scss'
import { ActionButton } from '../../components/ActionButton'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

type SignUpFormData = {
  email: string;
  password: string;
  name: string;
  schedule?: string;
}

const signUpFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup.string().required('Senha obrigatória'),
  schedule: yup.string().notRequired().default(null).nullable()
})

export default function SignUp() {

  const [userType, setUserType] = useState(true)
  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(signUpFormSchema)
  })

  const handleSignUp:SubmitHandler<SignUpFormData> = (values) => {
    console.log(values)
  }

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
        <form onSubmit={handleSubmit(handleSignUp)} >
          <div className={styles.inputsBox}>
            <Input
                type="text"
                placeholder="Nome"
                icon={<FiUser color="#666360" size={18} />}
                errors={errors.name}
                {...register('name')}
            />
            <Input
                type="email"
                placeholder="E-mail"
                icon={<FiMail color="#666360" size={18} />}
                errors={errors.email}
                {...register('email')}
            />
            <Input
                type="password"
                placeholder="Senha"
                icon={<FiLock color="#666360" size={18} />}
                errors={errors.password}
                {...register('password')}
            />
            <TimeAvailabilityInput
              isOpen={!userType}
              errors={errors.schedule}
              {...register('schedule')}
            />
          </div>
          <ActionButton type="submit" text="Cadastrar" />
        </form>
        <div className={styles.goBack}>
          <FiArrowLeft color="#F4EDE8" size={18} />
          <NextLink href="/signin">Voltar para login</NextLink>
        </div>
      </div>
    </div>
  )
}