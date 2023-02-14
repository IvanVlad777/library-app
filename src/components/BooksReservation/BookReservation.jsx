import React, { useContext } from "react";
import { UserContext } from "../../context/Context";
import ReservationForm from "./ReservationForm";

const BookReservation = () => {
  const { currentUser } = useContext(UserContext);

  console.log("This is in reservations:", currentUser);

  return (
    <div>
      <h2>Book Reservation</h2>
      <h3>Hello, {currentUser && currentUser.uid && currentUser.uid}!</h3>

      <ReservationForm />
    </div>
  );
};

export default BookReservation;
