import { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes, memo, ReactElement } from 'react'
import { FieldError } from 'react-hook-form'
import styles from './input.module.scss'
import lodash from 'lodash'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactElement,
  errors?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({icon, errors = null, ...rest}, ref) => {
  return (
    <>
      <div className={styles.inputContainer}>
        {icon}
        <input {...rest} ref={ref} />
        <label data-testid="label-error" className={styles.errorLabel} htmlFor={rest.name}>{errors?.message}</label>
      </div>
    </>
  )
}

export const Input = forwardRef(InputBase)
