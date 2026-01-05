import { create } from 'zustand';

interface AddBookingFormStore {
  name: string;
  email: string;
  checkin:  Date | undefined;
  checkout:  Date | undefined;
  totalGuests: string;
  totalRooms: number;
  roomType: string;
  amenitiesList: string[];
  setName: (val: string) => void;
  setEmail: (val: string) => void;
   setCheckIn: (date: Date | undefined) => void;
  setCheckOut: (date: Date | undefined) => void;
  setTotalGuests: (val: string) => void;
  setTotalRooms: (val: number) => void;
  setRoomType: (val: string) => void;
  setAmenities: (val: string[]) => void;
  reset: () => void;
}

export const useBookingFormStore = create<AddBookingFormStore>((set) => ({
  name: '',
  email: '',
  checkin: undefined,
  checkout: undefined,
  totalGuests: '',
  totalRooms: 0,
  roomType: '',
  amenitiesList: [],
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setCheckIn: (date) => set({ checkin: date }),
  setCheckOut: (date) => set({ checkout: date }),
  setTotalGuests: (totalGuests) => set({ totalGuests }),
  setTotalRooms: (totalRooms) => set({ totalRooms }),
  setRoomType: (roomType) => set({ roomType }),
  setAmenities: (amenitiesList) => set({ amenitiesList }),
  reset: () =>
    set({
      name: '',
      email: '',
      checkin: undefined,
    checkout: undefined,
    totalGuests: '',
    totalRooms: 0,
    roomType: '',
    amenitiesList: [],
    }),
}));
