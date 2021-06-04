import { motion } from 'framer-motion'
import { FiClock } from 'react-icons/fi'
import { Input } from '../Input'

interface TimeAvailabilityInputProps {
  isOpen?: boolean
}

export function TimeAvailabilityInput({ isOpen }: TimeAvailabilityInputProps) {
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
        // errors={errors.email}
        // {...register('email')}
      />
    </motion.div>
  )
}