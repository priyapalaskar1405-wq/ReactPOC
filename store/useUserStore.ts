import { create } from 'zustand';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: string;
}

interface UserStore {
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  deleteUser: (id: number) => void;
}
export const useUserStore = create<UserStore>((set) => ({
  users: [
    {
      id: 1,
      name: 'John Doe',
      password: '123456',
      email: 'john@example.com',
      age: 5,
      role: 'Admin',
      skills: ['React', 'Node'],
      gender: 'male',
      interests: ['Music', 'Sports'],
    },
  ],

  // Add a new user
  addUser: (userData) =>
    set((state) => ({
      users: [
        ...state.users,
        {
          id: state.users.length + 1,
          ...userData,
        },
      ],
    })),

  // Update an existing user by ID
  updateUser: (updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user,
      ),
    })),

  // Delete a user by ID
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
}));
