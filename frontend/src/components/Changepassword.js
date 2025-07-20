import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdate = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New Password and Confirm Password do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log(oldPassword,newPassword,confirmPassword)
      console.log("Token from localStorage:", token); 
      const response = await axios.post(
        "http://127.0.0.1:8000/changepassword/",
        {
          old_password: oldPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      alert("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.detail || "Failed to update password");
      } else {
        alert("An error occurred while updating password");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Change Password</h2>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Old Password:</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button style={styles.button} onClick={handleUpdate}>
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "3rem",
  },
  card: {
    backgroundColor: "#f8f8f8",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "340px",
    textAlign: "center",
  },
  heading: {
    marginBottom: "1.5rem",
  },
  inputGroup: {
    marginBottom: "1rem",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "0.6rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    marginTop: "1rem",
    padding: "0.7rem 1.5rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default ChangePassword;
