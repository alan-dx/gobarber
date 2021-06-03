import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import SignIn from '../../pages/signin'
import { mocked } from 'ts-jest/utils'
import { useForm } from 'react-hook-form'

// jest.mock('react-hook-form')

describe('Sign-in page', () => {
  it('renders correctly', () => {
    render(<SignIn />)

    expect(screen.getByText('Faça seu login')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'hero' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'logo'})).toBeInTheDocument();
    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();

  })
  // it('sends the form data correctly', () => {

  //   const useFormMocked = mocked(useForm)
  //   const handleSumbmitMocked = jest.fn()

  //   useFormMocked.mockReturnValueOnce({
  //     handleSubmit: handleSumbmitMocked,
  //     register: jest.fn(),
  //     formState: {
  //       errors: {
  //         email: null,
  //         password: null
  //       }
  //     }
  //   } as any)
    
  //   render(<SignIn />)

  //   const emailInput = screen.getByPlaceholderText('E-mail')
  //   const passwordInput = screen.getByPlaceholderText('Senha')
  //   // const submitButton = screen.getByRole('button', { name: 'Entrar'})
  //   const formSignIn = screen.getByTestId("form-signin")

  //   userEvent.type(emailInput, 'admin@teste.com')
  //   userEvent.type(passwordInput, '123456')
  //   fireEvent.submit(formSignIn)

  //   expect(emailInput).toHaveValue('admin@teste.com')
  //   expect(handleSumbmitMocked).toHaveBeenCalled()
  
  // })
})