
import { render, screen } from '@testing-library/react'
import UserTable from './user-table'
import { User } from '@/types/types'

describe('UserTable', () => {
  const mockUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@test.com',
      age: 30,
      role: 'admin',
      skills: ['React', 'Node'],
      gender: 'male',
      interests: ['Music', 'Sports'],
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@test.com',
      age: 28,
      role: 'manager',
      skills: ['Python'],
      gender: 'female',
      interests: ['Travel'],
    },
  ]

  it('should render table with headers', () => {
    render(<UserTable users={mockUsers} />)
    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Age')).toBeInTheDocument()
    expect(screen.getByText('Role')).toBeInTheDocument()
    expect(screen.getByText('Gender')).toBeInTheDocument()
  })

  it('should render user data', () => {
    render(<UserTable users={mockUsers} />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@test.com')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('30')).toBeInTheDocument()
  })

  it('should format skills as comma-separated', () => {
    render(<UserTable users={mockUsers} />)
    expect(screen.getByText('React, Node')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
  })

  it('should render empty table when no users', () => {
    render(<UserTable users={[]} />)
    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
  })

  it('should render correct number of rows', () => {
    render(<UserTable users={mockUsers} />)
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(3) // 1 header + 2 data rows
  })
})
