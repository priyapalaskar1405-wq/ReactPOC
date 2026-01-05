'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Booking } from '@/types/types';
import { useEffect } from 'react';
interface UserTableProps {
  users: Booking[];
  onDelete: (userId: number) => void;
  onEdit: (user: Booking) => void;
}

export default function BookingTable({ users, onDelete, onEdit }: UserTableProps) {
  useEffect(() => {
    console.log(users);
  }, [users]);
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>checkin</TableHead>
            <TableHead>checkout</TableHead>
            <TableHead>totalGuests</TableHead>
            <TableHead>totalRooms</TableHead>
            <TableHead>roomType</TableHead>
            <TableHead>amenitiesList</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user: Booking) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{String(user.checkin)}</TableCell>
              <TableCell>{String(user.checkout)}</TableCell>
              <TableCell>{user.totalGuests}</TableCell>
              <TableCell>{user.totalRooms}</TableCell>
              <TableCell>{user.roomType}</TableCell>
              {/* <TableCell>{(user.amenitiesList ?? []).join(', ')}</TableCell> */}
              <TableCell>
                {(Array.isArray(user.amenitiesList) ? user.amenitiesList : []).join(
                  ', ',
                )}
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
