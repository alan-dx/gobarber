import { render, screen, fireEvent } from '@testing-library/react'
import { ActionButton } from '.'

describe('Action Button', () => {
  it('renders correctly', () => {
    render(<ActionButton text="Entrar" />)

    expect(screen.getByText("Entrar")).toBeInTheDocument()
  })

  it('should call onClick function', () => {

    const onClickMock = jest.fn()

    render(<ActionButton text="Entrar" onClick={onClickMock} />)

    const actionButton = screen.getByText("Entrar")

    fireEvent.click(actionButton)

    expect(onClickMock).toHaveBeenCalled()
  })
})