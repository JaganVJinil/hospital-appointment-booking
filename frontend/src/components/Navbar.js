import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  // Fetch user profile on mount
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://127.0.0.1:8000/profile/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => {
          console.error("Failed to load profile:", err.response?.data || err.message);
        });
    }
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://127.0.0.1:8000/logout/",
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      navigate("/login", { replace: true });
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.userInfo}>
        <p style={styles.userName}><strong>{profile?.name || "User"}</strong></p>
        <p style={styles.userEmail}><strong>{profile?.email || ""}</strong></p>
      </div>

      <div style={styles.leftNav}>
        <Link to="/homepage" style={styles.link}>Home</Link>
        <Link to="/doctorlist" style={styles.link}>Book Appointment</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>
        <Link to="/changepassword" style={styles.link}>Change Password</Link>
        <button onClick={handleLogout} style={styles.logout}>Logout</button>
      </div>

      <div>
        <button
          style={styles.appointmentButton}
          onClick={() => navigate("/myappointments")}
        >
          <b>Appointments</b>
        </button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: "1rem 2rem",
    color: "#fff",
    flexWrap: "wrap",
  },
  logout: {
    backgroundColor: "#007bff",
    border: "none",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "16px",
    color: "white",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    marginRight: "2rem",
  },
  userName: {
    margin: 0,
    fontSize: "14px",
  },
  userEmail: {
    margin: 0,
    fontSize: "12px",
    color: "#e0e0e0",
  },
  leftNav: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "16px",
  },
  appointmentButton: {
    padding: "0.6rem 1.2rem",
    backgroundColor: "rgba(12, 211, 237, 0.87)",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "rgba(174, 0, 23, 0.93)",
  },
};

export default Navbar;
