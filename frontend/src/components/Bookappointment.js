import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "../App.css";

function BookAppointment() {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Simulate user ID fetch if stored somewhere in local/session storage
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(parseInt(storedUserId));
    } else {
      // Fetch from token if needed or redirect
      console.warn("User ID not found in localStorage");
    }
  }, []);

  const handleConfirm = async () => {
    if (!date || !time) {
      setMessage("Please select date and time.");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/book-appointment/",
        {
          doctor: doctor.id,
          user: userId,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setMessage("Appointment booked successfully!");
      setTimeout(() => navigate("/homepage"), 2000); // Redirect to home after 2 sec
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
      setMessage(error.response?.data.message || "Booking failed.");
    }
  };

  if (!doctor) {
    return <p>No doctor selected. Go back and choose a doctor.</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="booking-container">
        <h2 className="booking-heading">Book Appointment</h2>

        <div className="booking-form">
          <label><strong>Doctor:</strong></label>
          <p>{doctor.name}</p>

          <label><strong>Date:</strong></label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="booking-input"
          />

          <label><strong>Time:</strong></label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="booking-input"
          />

          <button className="confirm-button" onClick={handleConfirm}>
            Confirm Appointment
          </button>

          {message && <p className="booking-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;
