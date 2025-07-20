
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/Homepage";
import DoctorList from "./components/Doctorlist";
import Bookappointment from "./components/Bookappointment";
import Changepassword from "./components/Changepassword";
import Myappointments from "./components/Myappointments";
import Profile from "./components/Profile";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />   
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/doctorlist" element={<DoctorList />} />
        <Route path="/bookappointment" element={<Bookappointment />} />
        <Route path="/changepassword" element={<Changepassword />} />
        <Route path="/myappointments" element={<Myappointments />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  ); 
}

export default App;



