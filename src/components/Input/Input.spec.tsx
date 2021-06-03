import { render, screen } from '@testing-library/react'
import { FiMail } from 'react-icons/fi'
import { Input } from '.'

describe('Input component', () => {
  it('renders with icon correctly', () => {
      render(
        <Input
          type="email"
          placeholder="E-mail"
          icon={<FiMail data-testid="icon" color="#666360" size={18} />}
        />
      )

      
      expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument()
      expect(screen.getByTestId('icon')).toBeInTheDocument()
      expect(screen.getByTestId('icon')).toHaveAttribute('color', "#666360")
  })
  it('should show error label', () => {
    render(
      <Input
        type="email"
        placeholder="E-mail"
        icon={<FiMail data-testid="icon" color="#666360" size={18} />}
        errors={{message: 'Here have an error'} as any}
      />
    )

    screen.debug()
    expect(screen.getByTestId("label-error")).toHaveTextContent("Here have an error")
  })
})