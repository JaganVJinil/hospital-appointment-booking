import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "../App.css";
import BackgroundWrapper from "./BackgroundWrapper";

function Appointments() {
  const [view, setView] = useState("upcoming");
  const [filterDate, setFilterDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAppointments();
  }, [view]);

  const fetchAppointments = () => {
    axios
      .get(`http://127.0.0.1:8000/list_appointment/?type=${view}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err.response?.data || err.message);
      });
  };

  const handleCancel = (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    axios
      .delete(`http://127.0.0.1:8000/cancel_appointment/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        alert(res.data.message);
        closeModal();
        fetchAppointments(); // Refresh the list
      })
      .catch((err) => {
        console.error("Cancel failed:", err.response?.data || err.message);
        alert("Failed to cancel appointment.");
      });
  };

  const closeModal = () => setSelectedAppointment(null);

  const filteredAppointments = filterDate
    ? appointments.filter((appt) => appt.date === filterDate)
    : appointments;

  return (
    <div>
      <Navbar />
      <BackgroundWrapper>
      <div className="container">
        <div className="button-group">
          <button
            onClick={() => setView("upcoming")}
            className={view === "upcoming" ? "btn-primary" : "btn-secondary"}
          >
            Upcoming Appointments
          </button>
          <button
            onClick={() => setView("past")}
            className={view === "past" ? "btn-primary" : "btn-secondary"}
          >
            Past Appointments
          </button>
        </div>

        <div className="filter-container">
          <label htmlFor="dateFilter" className="filter-label">Filter by Date:</label>
          <input
            id="dateFilter"
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="date-input"
          />
        </div>

        <div className="card-container">
          {filteredAppointments.map((appt) => (
            <div
              key={appt.id}
              className="card"
              onClick={() => setSelectedAppointment(appt)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={appt.doctor.image}
                alt={appt.doctor.name}
                className="card-image"
              />
              <h3>{appt.doctor.name}</h3>
              <p><strong>Department:</strong> {appt.doctor.department}</p>
              <p><strong>Date:</strong> {appt.date}</p>
              <p><strong>Time:</strong> {appt.time}</p>
            </div>
          ))}
        </div>

        {selectedAppointment && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={closeModal}>X</button>
              <h3>{selectedAppointment.doctor.name}</h3>
              <img
                src={selectedAppointment.doctor.image}
                alt={selectedAppointment.doctor.name}
                className="modal-image"
              />
              <p><strong>Department:</strong> {selectedAppointment.doctor.department}</p>
              <p><strong>Date:</strong> {selectedAppointment.date}</p>
              <p><strong>Time:</strong> {selectedAppointment.time}</p>

              {view === "upcoming" ? (
                <button
                  className="cancel-button"
                  onClick={() => handleCancel(selectedAppointment.id)}
                >
                  Cancel Appointment
                </button>
              ) : (
                <p><strong>Status:</strong> {selectedAppointment.status || "N/A"}</p>
              )}
            </div>
            
          </div>
          
        )}
      </div>
      </BackgroundWrapper>
    </div>
  );
}

export default Appointments;
