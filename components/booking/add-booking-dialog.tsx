'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from "@/components/ui/calendar"
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select"


interface Props {
  name: string;
  email: string;
  checkin: Date | undefined;
  checkout: Date | undefined;
  totalGuests: string;
  totalRooms: number;
  roomType: string;
  amenitiesData: string[];
  setName: (val: string) => void;
  setEmail: (val: string) => void;
  setCheckIn: (val: Date | undefined) => void;
  setCheckOut: (val: Date | undefined) => void;
  setTotalGuests: (val: string) => void;
  setTotalRooms: (val: number) => void;
  setRoomType: (val: string) => void;
  setAmenities: (val: string[]) => void;
  onRegister: () => void;
  userToEdit: unknown;
}

export default function AddBookingDialog({
  name,
  email,
  checkin,
  checkout,
  totalGuests,
  totalRooms,
  roomType,
amenitiesData,

  setName,
  setEmail,
  setCheckIn,
  setCheckOut,
  setTotalGuests,
  setTotalRooms,
  setRoomType,
  setAmenities,
  onRegister,
  userToEdit,
}: Props) {
  const [error, setError] = useState<string>('');
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    if (userToEdit) {
      // setName(userToEdit.name);
      // setEmail(userToEdit.email);
      // setCheckIn(userToEdit.checkin);
      // setAge(userToEdit.age);
      // setInterests(userToEdit.amenitiesList);
    } else {
      // Reset form fields when not editing
      setName('');
      setEmail('');
      setCheckIn(undefined);   
      setCheckOut(undefined);
      setTotalGuests('');
      setTotalRooms(0);
      setRoomType('');
      setAmenities([]);
    }
  }, [
    userToEdit,
    setName,
    setEmail,
    setCheckIn,
    setCheckOut,
    setTotalGuests,
    setTotalRooms,
    setRoomType,
    setAmenities,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !checkin ) {
      setError('Please fill in all the required fields.');
      return;
    }
    setError('');
    onRegister();
    setDialogOpen(false); // Close dialog after submitting
  };

 // const handleInterestChange = (amenity: string) => {
    // if (amenitiesList.includes(amenity)) {
    //   setInterests(amenitiesList.filter((i) => i !== amenity));
    // } else {
    //   setInterests([...amenitiesList, amenity]);
    // }
 // };

  return (
    <Dialog open={isDialogOpen || userToEdit} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          {userToEdit ? 'Edit User' : '+ Book hotel'}
        </Button>
      </DialogTrigger>

      <DialogContent aria-describedby={undefined} className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {userToEdit ? 'Edit User' : 'User Registration'}
          </DialogTitle>
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
           {/* <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />  */}
           <div className="grid gap-2">
           <Label>{checkin ? checkin.toLocaleDateString() : 'Check-in'}</Label>
           <Calendar
              mode="single"
              selected={checkin}
              onSelect={(date) => setCheckIn(date)}  // Passing the selected date to the store
            />
          </div>
            <div className="grid gap-2">
            <Label>{checkout ? checkout.toLocaleDateString() : 'Check-out'}</Label>
            <Calendar
              mode="single"
              selected={checkout}
              onSelect={(date) => setCheckOut(date)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Number of Guests</Label>
            <Input
              type="number"
              value={totalGuests}
              onChange={(e) => setTotalGuests(e.target.value)}
              placeholder="Number of Guests"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label>Number of Rooms</Label>
            <Input
              type="number"
              value={totalRooms}
              onChange={(e) => setTotalRooms(Number(e.target.value))}
              placeholder="Number of Rooms"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label>Room Type</Label>
            <select
              className="border rounded-md px-3 py-2"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            >
              <option value="">Please Select Room Type</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
          <MultiSelect>
          <MultiSelectTrigger className="w-full max-w-[400px]">
            <MultiSelectValue placeholder="Select frameworks..." />
          </MultiSelectTrigger>
          <MultiSelectContent>
            <MultiSelectGroup>
              {amenitiesData.map((item, index)=>{
                return(<>
                 <MultiSelectItem  key={index} value={item}>{item}</MultiSelectItem>
                 </>)
              })}
              
            </MultiSelectGroup>
          </MultiSelectContent>
        </MultiSelect>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          <DialogClose asChild>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSubmit}
            >
              {userToEdit ? 'Save Changes' : 'Book'}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
