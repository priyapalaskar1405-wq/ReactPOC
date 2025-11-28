"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  name: string;
  email: string;
  password: string;
  age: string;
  role: string;
  skills: string[];
  gender: string;
  interests: string[];
  skillsList: string[];
  interestsList: string[];
  setName: (val: string) => void;
  setEmail: (val: string) => void;
  setPassword: (val: string) => void;
  setAge: (val: string) => void;
  setRole: (val: string) => void;
  setSkills: (val: string[]) => void;
  setGender: (val: string) => void;
  setInterests: (val: string[]) => void;  // Adjusted to handle an array of interests
  onRegister: () => void;
  userToEdit: any;  // Prop for editing an existing user
}

export default function UserRegisterDialog({
  name,
  email,
  password,
  age,
  role,
  skills,
  gender,
  interests,
  skillsList,
  interestsList,
  setName,
  setEmail,
  setPassword,
  setAge,
  setRole,
  setSkills,
  setGender,
  setInterests,
  onRegister,
  userToEdit,  // Handle user editing
}: Props) {
  const [error, setError] = useState<string>("");
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);  // Control dialog visibility

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setPassword(userToEdit.password);
      setAge(userToEdit.age);
      setRole(userToEdit.role);
      setSkills(userToEdit.skills);
      setGender(userToEdit.gender);
      setInterests(userToEdit.interests);
    } else {
      // Reset form fields when not editing
      setName("");
      setEmail("");
      setPassword("");
      setAge("");
      setRole("");
      setSkills([]);
      setGender("");
      setInterests([]);
    }
  }, [userToEdit, setName, setEmail, setPassword, setAge, setRole, setSkills, setGender, setInterests]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !age) {
      setError("Please fill in all the required fields.");
      return;
    }
    setError("");
    onRegister();  
    setDialogOpen(false);  // Close dialog after submitting
  };

  const handleInterestChange = (interest: string) => {
    if (interests.includes(interest)) {     
      setInterests(interests.filter(i => i !== interest));
    } else {     
      setInterests([...interests, interest]);
    }
  };

  return (
    <Dialog open={isDialogOpen || userToEdit} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          {userToEdit ? "Edit User" : "+ Register User"}  
        </Button>
      </DialogTrigger>

      <DialogContent aria-describedby={undefined} className="max-w-md">
        <DialogHeader>
          <DialogTitle>{userToEdit ? "Edit User" : "User Registration"}</DialogTitle> 
        </DialogHeader>

        <div className="grid gap-4 py-4 max-h-[400px] overflow-y-auto pr-2">         
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              required
            />
          </div>         
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>         
          <div className="grid gap-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>         
          <div className="grid gap-2">
            <Label>Age</Label>
            <Input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              required
            />
          </div>        
          <div className="grid gap-2">
            <Label>Role</Label>
            <select
              className="border rounded-md px-3 py-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="staff">Staff</option>
            </select>
          </div>         
          <div className="grid gap-2">
            <Label>Skills</Label>
            <select
              multiple
              className="border rounded-md px-3 py-2 h-24"
              value={skills}
              onChange={(e) =>
                setSkills(Array.from(e.target.selectedOptions, (option) => option.value))
              }
            >
              {skillsList.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>        
          <div className="grid gap-2">
            <Label>Gender</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                />
                Male
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                />
                Female
              </label>
            </div>
          </div>         
          <div className="grid gap-2">
            <Label>Interests</Label>
            <div className="flex flex-col gap-2">
              {interestsList.map((interest) => (
                <label key={interest} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={interests.includes(interest)}
                    onChange={() => handleInterestChange(interest)}
                  />
                  {interest}
                </label>
              ))}
            </div>
          </div>         
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}         
          <DialogClose asChild>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSubmit}
            >
              {userToEdit ? "Save Changes" : "Register"} 
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
