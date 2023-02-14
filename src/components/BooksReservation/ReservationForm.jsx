import React from "react";
import { useState } from "react";
import axios from "axios";
import "./reservation.css";

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const onChangeValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "http://localhost:80/library-app/reservation/bookreservation.php",
        formData
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div>
      <h3>Welcome to this library app!</h3>
      <p>If you have want to make a book reservation, please do it here!</p>
      <form onSubmit={handleRegister} className="reservationForm">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={onChangeValue}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={onChangeValue}
          required
        />

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={onChangeValue}
          required
        ></textarea>

        <button
          type="submit"
          name="submit"
          value="Submit"
          className="formReservationBtn"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
