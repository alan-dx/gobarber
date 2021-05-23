import { InputHTMLAttributes, ReactElement } from 'react'
import styles from './input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactElement
}

export function Input({icon ,...rest}: InputProps) {
  return (
    <div className={styles.inputContainer}>
      {icon}
      <input {...rest} />
    </div>
  )
}