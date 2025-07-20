// src/components/Signup.js
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const registerUser = () => {
    if (password !== passwordConf) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const user = {
      name,
      email,
      dob,
      gender,
      address,
      contact_no: contact,
      password,
    };

    axios
      .post("http://127.0.0.1:8000/signup/", user)
      .then((response) => {
        setErrorMessage("");
        alert("Signup successful!");
        navigate("/login");
      })
      .catch((error) => {
        if (error.response?.data?.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Failed to connect to API.");
        }
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create an Account</h2>

        {errorMessage && (
          <div style={{ color: "red", marginBottom: "1rem" }}>{errorMessage}</div>
        )}

        <div style={styles.inputGroup}>
          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email ID</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Gender</label>
          <div style={styles.checkboxGroup}>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Other
            </label>
          </div>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={styles.textarea}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Contact Number</label>
          <input
            type="tel"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Confirm Password</label>
          <input
            type="password"
            value={passwordConf}
            onChange={(e) => setPasswordConf(e.target.value)}
            style={styles.input}
          />
        </div>

        <button onClick={registerUser} style={styles.button}>
          Register
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #fbc2eb, #a6c1ee)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
    maxWidth: "500px",
    width: "100%",
  },
  title: {
    marginBottom: "1.5rem",
    fontSize: "24px",
    color: "#333",
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "14px",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "0.7rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
  },
  textarea: {
    width: "100%",
    padding: "0.7rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
    resize: "vertical",
  },
  checkboxGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    fontSize: "14px",
    color: "#333",
  },
  loginText: {
    marginTop: "1rem",
    fontSize: "14px",
    textAlign: "center",
  },
  link: {
    color: "#4a90e2",
    textDecoration: "none",
    fontWeight: "bold",
  },
  button: {
    marginTop: "1rem",
    width: "100%",
    padding: "0.8rem",
    backgroundColor: "#4a90e2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default Signup;
