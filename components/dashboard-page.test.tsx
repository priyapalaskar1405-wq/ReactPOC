import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../store/authStore'
import { useUserStore } from '../store/useUserStore'
import { useAddUserFormStore } from '../store/useAddUserFormStore'
import DashboardPage from './dashboard-page'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('../store/authStore', () => ({
  useAuthStore: jest.fn(),
}))

jest.mock('../store/useUserStore', () => ({
  useUserStore: jest.fn(),
}))

jest.mock('../store/useAddUserFormStore', () => ({
  useAddUserFormStore: jest.fn(),
}))

jest.mock('./user-register-dialog', () => {
  return function MockUserRegisterDialog() {
    return <div>User Register Dialog</div>
  }
})

jest.mock('./user-table', () => {
  return function MockUserTable() {
    return <div>User Table</div>
  }
})

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

describe('DashboardPage', () => {
  const mockPush = jest.fn()
  const mockLogout = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
    localStorage.setItem('auth', 'true')

    ;(useRouter as unknown as jest.Mock).mockReturnValue({ push: mockPush })
    
    ;(useAuthStore as unknown as jest.Mock).mockImplementation((fn) => {
      if (typeof fn === 'function') {
        return fn({ isAuthenticated: true, logout: mockLogout })
      }
      return { isAuthenticated: true, logout: mockLogout }
    })
    
    ;(useUserStore as unknown as jest.Mock).mockImplementation((fn) => {
      if (typeof fn === 'function') {
        return fn({ users: [] })
      }
      return { users: [] }
    })
    
    ;(useAddUserFormStore as unknown as jest.Mock).mockImplementation((fn) => {
      const store = {
        name: '',
        email: '',
        password: '',
        age: '',
        role: '',
        skills: [],
        gender: '',
        interests: [],
        reset: jest.fn(),
      }
      if (typeof fn === 'function') {
        return fn(store)
      }
      return store
    })
  })

  it('should render dashboard header', () => {
    render(<DashboardPage />)
    expect(screen.getByText('User Dashboard')).toBeInTheDocument()
  })

  it('should render logout button', () => {
    render(<DashboardPage />)
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument()
  })

  it('should render user details section', () => {
    render(<DashboardPage />)
    expect(screen.getByText('User Details')).toBeInTheDocument()
  })

  it('should logout and redirect on logout click', async () => {
    const user = userEvent.setup()
    render(<DashboardPage />)
    await user.click(screen.getByRole('button', { name: /logout/i }))
    expect(mockLogout).toHaveBeenCalled()
    expect(mockPush).toHaveBeenCalledWith('/login')
  })

  it('should redirect to login if not authenticated', () => {
    ;(useAuthStore as unknown as jest.Mock).mockImplementation((fn) => {
      if (typeof fn === 'function') {
        return fn({ isAuthenticated: false, logout: mockLogout })
      }
      return { isAuthenticated: false, logout: mockLogout }
    })
    localStorage.removeItem('auth')
    render(<DashboardPage />)
    expect(mockPush).toHaveBeenCalledWith('/login')
  })
})
