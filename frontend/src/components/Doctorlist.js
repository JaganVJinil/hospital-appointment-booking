import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import '../App.css';
import BackgroundWrapper from "./BackgroundWrapper";

function DoctorList() {
  const [searchDept, setSearchDept] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors,setDoctors] = useState([]);
  const navigate = useNavigate();
  const handleBookClick = (doctor) => {
  navigate("/bookappointment", { state: { doctor } });
};

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    axios
      .get("http://127.0.0.1:8000/list_doctors/", {
        headers: {
          Authorization: `Token ${token}`,  
        },
      })
      .then((res) => {
  console.log(res.data);
  setDoctors(res.data);
})

      
      .catch((err) => 
        console.error("Error fetching doctors:", err.response?.data || err.message)
      );
  }, []);

  const filteredDoctors = doctors.filter((doc) =>
    doc.department.toLowerCase().includes(searchDept.toLowerCase())
  );

  const closeModal = () => setSelectedDoctor(null);
 
  return (
    <div>
      <Navbar />
      <BackgroundWrapper>
      <div className="doctor-container">
        <h2 className="doctor-heading">Available Doctors</h2>
        
        <input
          type="text"
          placeholder="Filter by department..."
          value={searchDept}
          onChange={(e) => setSearchDept(e.target.value)}
          className="doctor-search-input"
        />
      

        <div className="card-container">
          {filteredDoctors.map((doc) => (
            <div key={doc.id} className="card" onClick={() => setSelectedDoctor(doc)}>
            <img src={`http://127.0.0.1:8000/${doc.image}`} alt={doc.name} className="card-image" />
              <h3>{doc.name}</h3>
              <p><strong>Department:</strong> {doc.department}</p>
              <button className="book-button" onClick={() => handleBookClick(doc)}>
  Book Here
</button>

            </div>
          ))}
        </div>
      </div>

      {selectedDoctor && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>X</button>
            <h3>{selectedDoctor.name}</h3>
            <img src={`http://127.0.0.1:8000/${selectedDoctor.image}`} alt={selectedDoctor.name} className="modal-image" />
            <p><strong>Department:</strong> {selectedDoctor.department}</p>
            <p><strong>Qualification:</strong> {selectedDoctor.qualification}</p>
            <p><strong>Experience:</strong> {selectedDoctor.experience}</p>
          </div>
        </div>
        
      )}
      </BackgroundWrapper>
    </div>
  );
}

export default DoctorList;
   