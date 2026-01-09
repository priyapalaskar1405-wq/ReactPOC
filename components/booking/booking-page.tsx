'use client';

import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { useBookingFormStore } from '@/store/useBookingFormStore';
import { useBookingStore } from '@/store/useBookingStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AddBookingDialog from '@/components/booking/add-booking-dialog'
import BookingTable from './booking-table';
import CKEditorComponent  from "../ui/CKEditor"
import api from "../../APIService/axios";
import useCounterStore from '@/store/useAddUserFormStore';


export default function BookingPage(){
        const router = useRouter();
        const { isAuthenticated, logout } = useAuthStore();
        const users = useBookingStore((state) => state.bookings);
        const addBooking = useBookingStore((state) => state.addBooking);
        // const updateUser = useBookingStore((state) => state.updateUser);
        // const deleteUser = useBookingStore((state) => state.deleteUser);
      
        const {
        name,
        email,
        checkin,
        checkout,
        totalGuests,
        totalRooms,
        roomType,
        amenitiesList,

        setName,
        setEmail,
        setCheckIn,
        setCheckOut,
        setTotalGuests,
        setTotalRooms,
        setRoomType,
        setAmenities,
        reset,
        } = useBookingFormStore();
      
        const amenitiesData = ['Music', 'Sports', 'Travel'];
      
        const [userToEdit, setUserToEdit] = useState<unknown>(null);
      

      useEffect(() => {
        const auth = localStorage.getItem('auth');
        if (!isAuthenticated && auth !== 'true') router.push('/login');
      }, [isAuthenticated, router]);

      
  const registerUser = () => {
    if (userToEdit) {
      // updateUser({
      //   id: userToEdit.id,
      //   name,
      //   email,
      //   password,
      //   age,
      //   role,
      //   skills,
      //   gender,
      //   interests,
      // });
    } else {
      addBooking({
        id: users.length + 1,
        name,
        email,
        checkin,
        checkout,
        totalGuests,
        totalRooms,
        roomType,
        amenitiesList,
      });
    }
    reset();
    setUserToEdit(null);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('auth');
    router.push('/login');
  };

  const handleBooking = () => {
    router.push('/booking')    
  };

  const handleDeleteUser = (userId: number) => {
  //  deleteUser(userId);
  };

  const handleEditUser = (user: unknown) => {
    setUserToEdit(user);
  };

   const handlePost = async () => {
    try {
      const newPost = {
        title: "Button Post Example",
        body: count,
        userId: 1, 
      };

      const res = await api.post("/posts", newPost);
      console.log("Post created:", res.data);
      alert("POST request successful!");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const {
       count,
       setCount,
      } = useCounterStore();

 return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Booking Dashboard</h1>
        <div className="flex items-center gap-3">
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleLogout}
          >
            Logout
          </Button>
           <Button
            className="bg-blue-600 hover:bg-red-700 text-white"
            onClick={handleBooking}
          >
            Booking
          </Button>

          <AddBookingDialog
            name={name}
            email={email}
            checkin={checkin}
            checkout={checkout}
            totalGuests={totalGuests}
            totalRooms={totalRooms}
            roomType={roomType}
            amenitiesData={amenitiesData}
            setName={setName}
            setEmail={setEmail}
            setCheckIn={setCheckIn}
            setCheckOut={setCheckOut}
            setTotalGuests={setTotalGuests}
            setTotalRooms={setTotalRooms}
            setRoomType={setRoomType}
            setAmenities={setAmenities}
            onRegister={registerUser}
            userToEdit={userToEdit}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          User Details
        </h2>
                <CKEditorComponent />

       <button
        onClick={handlePost}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Send POST API Request
      </button>

        {/* <BookingTable
          users={users}
          onDelete={handleDeleteUser}
          onEdit={handleEditUser}
        /> */}
      </div>
    </div>
  );

}