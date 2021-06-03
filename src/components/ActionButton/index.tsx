import { ButtonHTMLAttributes } from 'react'
import styles from './action_button.module.scss'

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
}

export function ActionButton({ text, ...rest }: ActionButtonProps) {
  return (
    <button className={styles.buttonContainer} {...rest} >
      <strong>
        {text}
      </strong>
    </button>
  )
}