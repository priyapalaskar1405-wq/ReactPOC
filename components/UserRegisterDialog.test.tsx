import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserRegisterDialog from './UserRegisterDialog'

describe('UserRegisterDialog', () => {
  const mockSetName = jest.fn()
  const mockSetEmail = jest.fn()
  const mockSetPassword = jest.fn()
  const mockSetAge = jest.fn()
  const mockSetGender = jest.fn()
  const mockToggleInterest = jest.fn()

  const defaultProps = {
    name: '',
    email: '',
    password: '',
    age: '',
    role: '',
    skills: [],
    gender: '',
    interests: [],
    skillsList: ['React', 'Node', 'Python'],
    interestsList: ['Music', 'Sports', 'Travel'],
    setName: mockSetName,
    setEmail: mockSetEmail,
    setPassword: mockSetPassword,
    setAge: mockSetAge,
    setRole: jest.fn(),
    setSkills: jest.fn(),
    setGender: mockSetGender,
    toggleInterest: mockToggleInterest,
    onRegister: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should open dialog when register button clicked', async () => {
    const user = userEvent.setup()
    render(<UserRegisterDialog {...defaultProps} />)

    const button = screen.getByRole('button', { name: /register user/i })
    expect(button).toBeInTheDocument()

    await user.click(button)
    await waitFor(() => {
      expect(screen.getByText('User Registration')).toBeInTheDocument()
    })
  })

  it('should render all form fields', async () => {
    const user = userEvent.setup()
    render(<UserRegisterDialog {...defaultProps} />)

    await user.click(screen.getByRole('button', { name: /register user/i }))

    await waitFor(() => {
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Password')).toBeInTheDocument()
      expect(screen.getByText('Age')).toBeInTheDocument()
      expect(screen.getByText('Gender')).toBeInTheDocument()
      expect(screen.getByText('Interests')).toBeInTheDocument()
    })
  })

  it('should update form fields on input', async () => {
    const user = userEvent.setup()
    render(<UserRegisterDialog {...defaultProps} />)

    await user.click(screen.getByRole('button', { name: /register user/i }))
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Full name')).toBeInTheDocument()
    })

    await user.type(screen.getByPlaceholderText('Full name'), 'John')
    await user.type(screen.getByPlaceholderText('Email'), 'john@test.com')
    await user.type(screen.getByPlaceholderText('Password'), 'pass123')
    await user.type(screen.getByPlaceholderText('Age'), '25')

    expect(mockSetName).toHaveBeenCalled()
    expect(mockSetEmail).toHaveBeenCalled()
    expect(mockSetPassword).toHaveBeenCalled()
    expect(mockSetAge).toHaveBeenCalled()
  })

  it('should update age on input change', async () => {
    const user = userEvent.setup()
    render(<UserRegisterDialog {...defaultProps} />)

    await user.click(screen.getByRole('button', { name: /register user/i }))
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Age')).toBeInTheDocument()
    })

    await user.type(screen.getByPlaceholderText('Age'), '25')
    expect(mockSetAge).toHaveBeenCalled()
  })

  it('should update gender on radio selection', async () => {
    const user = userEvent.setup()
    render(<UserRegisterDialog {...defaultProps} />)

    await user.click(screen.getByRole('button', { name: /register user/i }))
    await waitFor(() => {
      expect(screen.getByRole('radio', { name: 'Male' })).toBeInTheDocument()
    })

    await user.click(screen.getByRole('radio', { name: 'Male' }))
    expect(mockSetGender).toHaveBeenCalledWith('male')
  })

  it('should toggle interests on checkbox', async () => {
    const user = userEvent.setup()
    render(<UserRegisterDialog {...defaultProps} />)

    await user.click(screen.getByRole('button', { name: /register user/i }))
    await waitFor(() => {
      expect(screen.getByRole('checkbox', { name: 'Music' })).toBeInTheDocument()
    })

    await user.click(screen.getByRole('checkbox', { name: 'Music' }))
    expect(mockToggleInterest).toHaveBeenCalledWith('Music')
  })

  it('should display pre-filled form values', async () => {
    const user = userEvent.setup()
    const filledProps = {
      ...defaultProps,
      name: 'Jane Doe',
      email: 'jane@test.com',
      password: 'pass123',
      age: '30',
      gender: 'female',
    }

    render(<UserRegisterDialog {...filledProps} />)
    await user.click(screen.getByRole('button', { name: /register user/i }))

    await waitFor(() => {
      expect(screen.getByDisplayValue('Jane Doe')).toBeInTheDocument()
      expect(screen.getByDisplayValue('jane@test.com')).toBeInTheDocument()
      expect(screen.getByDisplayValue('pass123')).toBeInTheDocument()
      expect(screen.getByDisplayValue('30')).toBeInTheDocument()
    })
  })
})
