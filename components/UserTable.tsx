"use client";


import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User } from "@/types/types";
import { useEffect } from "react";
import { json } from "stream/consumers";
interface UserTableProps {
  users: User[];
  onDelete: (userId: number) => void;
  onEdit: (user: User) => void;
}

export default function UserTable({ users, onDelete, onEdit }: UserTableProps) {
  
  useEffect(()=>{
console.log(users)
  },[users])
  return (
    <div className="border rounded-lg overflow-hidden">
      
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Skills</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Interests</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user: User) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{(user.skills ?? []).join(", ")}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>
                {(Array.isArray(user.interests) ? user.interests : []).join(", ")}
              </TableCell>
              <TableCell>
                <button
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  onClick={() => onEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => onDelete(user.id)}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
