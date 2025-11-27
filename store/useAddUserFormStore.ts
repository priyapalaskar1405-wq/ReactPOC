import { create } from "zustand";

interface AddUserFormStore {
  name: string;
  email: string;
  password: string;
  age: number | string;
  role: string;
  skills: string[];
  gender: string;
  interests: string[];
  setName: (v: string) => void;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  setAge: (v: number | string) => void;
  setRole: (v: string) => void;
  setSkills: (v: string[]) => void;
  setGender: (v: string) => void;
  setInterests: (v: string[]) => void;
  reset: () => void;
}

export const useAddUserFormStore = create<AddUserFormStore>((set) => ({
  name: "",
  email: "",
  password: "",
  age: "",
  role: "",
  skills: [],
  gender: "",
  interests: [],
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setAge: (age) => set({ age }),
  setRole: (role) => set({ role }),
  setSkills: (skills) => set({ skills }),
  setGender: (gender) => set({ gender }),
  setInterests: (interests) => set({ interests }),
  reset: () =>
    set({
      name: "",
      email: "",
      password: "",
      age: "",
      role: "",
      skills: [],
      gender: "",
      interests: [],
    }),
}));
