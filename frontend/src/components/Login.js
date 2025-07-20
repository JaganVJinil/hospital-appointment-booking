// src/components/Login.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    const user = {
      email: email,
      password: password
    };

    axios.post('http://localhost:8000/login/', user)
      .then(response => {
        setErrorMessage('');
        localStorage.setItem('token', response.data.user.token);
        localStorage.setItem('user_id', response.data.user.id);
        navigate('/homepage');  
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.detail) {
          setErrorMessage(error.response.data.detail);
        } else {
          setErrorMessage("Login failed. Please try again.");
        }
      });
  }

  return (
    <div style={styles.container}> 
      <div style={styles.header}>
        <h1 style={styles.siteTitle}>Hospital Appointment-Booking Site</h1>
      </div>

      <div style={styles.card}>
        <h2 style={styles.title}>Login to Your Account</h2>
        <form onSubmit={handleLogin}>
          {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email ID</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" style={styles.button}>Login</button>
        </form>

        <p style={styles.signupText}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.link}>Create New Account</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
     minHeight: "100vh",
    backgroundImage: "url('/Landingpage.jpeg')", // path from public folder
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "2rem",
  },
  header: {
    marginBottom: "1rem",
  },
  siteTitle: {
    color: "rgb(55, 56, 57)",
    fontSize: "28px",
    fontWeight: "bold",
    textShadow: "1px 1px 4px rgba(78, 75, 8, 0.94)",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    marginBottom: "1.5rem",
    fontSize: "24px",
    color: "#333",
  },
  inputGroup: {
    textAlign: "left",
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
    transition: "0.3s",
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
  signupText: {
    marginTop: "1rem",
    fontSize: "14px",
  },
  link: {
    color: "#4a90e2",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Login; 
