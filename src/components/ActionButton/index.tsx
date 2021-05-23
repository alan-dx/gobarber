import styles from './action_button.module.scss'

export function ActionButton() {
  return (
    <button className={styles.buttonContainer}>
      <strong>Entrar</strong>
    </button>
  )
}