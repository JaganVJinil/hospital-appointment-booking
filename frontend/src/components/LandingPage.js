import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={styles.content}>
          <h1 style={styles.title}>WELCOME TO JVJ MEDICITY HOSPITAL</h1>
          <p style={styles.subtitle}>
            Book doctor appointments easily and quickly online.
          </p>
          <div style={styles.buttons}>
            <Link to="/login" style={styles.button}>Login</Link>
            <Link to="/signup" style={{ ...styles.button, backgroundColor: "#28a745" }}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "150vh",
    backgroundImage: "url('/hospitalimg11.png')", 
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    color: "#fff",
    textAlign: "center",
    position: "relative",
  },
  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  content: {
    maxWidth: "700px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
    zIndex: 1,
    marginTop:"-120px"
  },
  title: {
    fontSize: "32px",
    marginBottom: "1rem",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "18px",
    marginBottom: "2rem",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  button: {
    padding: "0.8rem 1.5rem",
    backgroundColor: "#007bff",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background 0.3s",
  },
};

export default LandingPage;
