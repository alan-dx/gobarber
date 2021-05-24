import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './action_button.module.scss'

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function ActionButton({ children }: ActionButtonProps) {
  return (
    <button className={styles.buttonContainer}>
      {children}
    </button>
  )
}