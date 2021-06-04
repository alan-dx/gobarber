import { motion } from 'framer-motion'
import { FiClock } from 'react-icons/fi'
import { FieldError } from 'react-hook-form'
import { Input } from '../Input'
import { forwardRef, ForwardRefRenderFunction, useEffect } from 'react'

interface TimeAvailabilityInputProps {
  isOpen?: boolean,
  errors: FieldError
}

const TimeAvailabilityInputBase:ForwardRefRenderFunction<unknown, TimeAvailabilityInputProps> = ({ isOpen, ...rest }, ref) => {

  // useEffect(() => {
  //   console.log('rest', ...rest: {})
  // }, [])

  return (
    <motion.div
      animate={isOpen ? {
        scale: [0, 1.1, 1],
        opacity: [0, 1]
      } : {
        scale: 0,
        opacity: 0
      }}
      transition={{
        duration: 0.7,
        ease: "easeInOut"
      }}
      initial={false}
    >
      <Input
        type="password"
        placeholder="Disponibilidade de Horário"
        icon={<FiClock color="#666360" size={18} />}
        {...rest}
        // errors={errors.email}
        // {...register('email')}
      />
    </motion.div>
  )
}

export const TimeAvailabilityInput = forwardRef(TimeAvailabilityInputBase)