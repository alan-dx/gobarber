import { Input } from '../../components/Input'
import styles from './signin.module.scss'
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi'
import { ActionButton } from '../../components/ActionButton'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import NextLink from 'next/link'

type SignInData = {
  email: string;
  password: string
}

const SignInFormSchema = yup.object().shape({
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup.string().required('Senha obrigatória'),
})

export default function SignIn() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(SignInFormSchema)
  })

  const handleSignIn: SubmitHandler<SignInData> = (values) => {
    console.log(values)
  }

  return (
    <div className={styles.container} >
      <div className={styles.signInBox} >
        <img src="/images/logo.svg" alt="logo" />
        <h1>Faça seu login</h1>
        <form onSubmit={handleSubmit(handleSignIn)} >
          <div className={styles.inputsBox}>
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
              errors={errors.password}
              icon={<FiLock color="#666360" size={18} />}
              {...register('password')}
            />
          </div>
          <ActionButton type="submit" >
            <strong>Entrar</strong>
          </ActionButton>
        </form>
        <NextLink href="/signup">Esqueci minha senha</NextLink>
        <div>
          <FiLogIn color="#FF9000" size={18} />
          <NextLink href="/signup">Criar conta</NextLink>
        </div>
      </div>
      <img src="/images/signin-hero.svg" alt="hero" />
    </div>
  )
}