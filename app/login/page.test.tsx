import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../../store/authStore'
import LoginPage from './page'


jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('../../store/authStore', () => ({
  useAuthStore: jest.fn(),
}))

const localStorageMock = (() => {
  let store: { [key: string]: string } = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('LoginPage', () => {
  const mockPush = jest.fn()
  const mockLogin = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
    ;(useAuthStore as jest.Mock).mockImplementation((selector) => {
      const store = { login: mockLogin, isAuthenticated: false }
      return selector(store)
    })
  })

  it('should render login form', () => {
    render(<LoginPage />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('should have correct input types', () => {
    render(<LoginPage />)
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement
    expect(emailInput.type).toBe('email')
    expect(passwordInput.type).toBe('password')
  })

  it('should update input values', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)
    await user.type(screen.getByLabelText('Email'), 'test@gmail.com')
    await user.type(screen.getByLabelText('Password'), '123456')
    expect((screen.getByLabelText('Email') as HTMLInputElement).value).toBe('test@gmail.com')
    expect((screen.getByLabelText('Password') as HTMLInputElement).value).toBe('123456')
  })

  it('should login with correct credentials', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)
    await user.type(screen.getByLabelText('Email'), 'test@gmail.com')
    await user.type(screen.getByLabelText('Password'), '123456')
    await user.click(screen.getByRole('button', { name: /login/i }))
    expect(mockLogin).toHaveBeenCalled()
    expect(mockPush).toHaveBeenCalledWith('/dashboard')
  })

  it('should show error with wrong credentials', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)
    await user.type(screen.getByLabelText('Email'), 'wrong@gmail.com')
    await user.type(screen.getByLabelText('Password'), '123456')
    await user.click(screen.getByRole('button', { name: /login/i }))
    expect(screen.getByText('Invalid email or password')).toBeInTheDocument()
  })
})
