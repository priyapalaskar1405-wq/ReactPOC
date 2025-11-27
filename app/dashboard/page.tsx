"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useAddUserFormStore } from "@/store/useAddUserFormStore";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserRegisterDialog from "../../components/UserRegisterDialog";
import UserTable from "../../components/UserTable";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();
  const users = useUserStore((state) => state.users);
  const addUser = useUserStore((state) => state.addUser);
  const updateUser = useUserStore((state) => state.updateUser); 
  const deleteUser = useUserStore((state) => state.deleteUser); 

  const {
    name, email, password, age, role, skills, gender, interests,
    setName, setEmail, setPassword, setAge, setRole, setSkills,
    setGender, setInterests, reset,
  } = useAddUserFormStore();

  const skillsList = ["React", "Node", "Python", "UI/UX", "Go"];
  const interestsList = ["Music", "Sports", "Travel"];

  const [userToEdit, setUserToEdit] = useState<any>(null);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (!isAuthenticated && auth !== "true") router.push("/login");
  }, [isAuthenticated, router]);

  const registerUser = () => {
    if (userToEdit) {
      updateUser({
        id: userToEdit.id,
        name,
        email,
        password,
        age,
        role,
        skills,
        gender,
        interests,
      });
    } else {
      addUser({
        id: users.length + 1,
        name,
        email,
        password,
        age,
        role,
        skills,
        gender,
        interests,
      });
    }
    reset(); // Reset form after submission
    setUserToEdit(null); // Reset edit state
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("auth");
    router.push("/login");
  };

  const handleDeleteUser = (userId: number) => {
    deleteUser(userId); 
  };

  const handleEditUser = (user: any) => {
    setUserToEdit(user); 
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
        <div className="flex items-center gap-3">
          <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleLogout}>
            Logout
          </Button>

          <UserRegisterDialog
            name={name}
            email={email}
            password={password}
            age={age}
            role={role}
            skills={skills}
            gender={gender}
            interests={interests}
            skillsList={skillsList}
            interestsList={interestsList}
            setName={setName}
            setEmail={setEmail}
            setPassword={setPassword}
            setAge={setAge}
            setRole={setRole}
            setSkills={setSkills}
            setGender={setGender}
            setInterests={setInterests}
            toggleInterest={() => {}}
            onRegister={registerUser}
            userToEdit={userToEdit} // for userToEdit here
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">User Details</h2>
        <UserTable
          users={users}
          onDelete={handleDeleteUser}
          onEdit={handleEditUser} // for edit function
        />
      </div>
    </div>
  );
}
