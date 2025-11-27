export type Skill = "React" | "Node" | "Python" | "UI/UX" | "Go";
export type Interest = "Music" | "Sports" | "Travel";

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  age: number | string;
  role: string;
  skills: string[];       
  gender: string;
  interests: string[];    
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  age: number | string;
  role: "admin" | "manager" | "staff" | "";
  skills: string[];
  gender: "male" | "female" | "";
  interests: string[];
}

