import { create } from 'zustand';

interface Booking {
  id: number;
  name: string;
  email: string;
  age: number;
  role: string;
}

interface UserStore {
  bookings: Booking[];
  addBooking: (user: Omit<Booking, 'id'>) => void;
 // deleteUser: (id: number) => void;
}
export const useBookingStore = create<UserStore>((set) => ({
  bookings: [
    {
      id: 1,
      name: 'ppp Doe',
      email: 'john@example.com',
      age: 5,
      role: 'Admin',
      skills: ['React', 'Node'],
      gender: 'male',
      interests: ['Music', 'Sports'],
    },
  ],

  // Add a new user
  addBooking: (bookingData) =>
    set((state) => ({
      bookings: [
        ...state.bookings,
        {
          id: state.bookings.length + 1,
          ...bookingData,
        },
      ],
    })),

  // // Update an existing user by ID
  // updateUser: (updatedUser) =>
  //   set((state) => ({
  //     bookings: state.bookings.map((user) =>
  //       user.id === updatedUser.id ? { ...user, ...updatedUser } : user,
  //     ),
  //   })),

  // // Delete a user by ID
  // deleteUser: (id) =>
  //   set((state) => ({
  //     bookings: state.bookings.filter((user) => user.id !== id),
  //   })),

    
}));
