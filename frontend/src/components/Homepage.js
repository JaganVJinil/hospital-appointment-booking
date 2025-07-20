import React from "react";
import Navbar from "./Navbar"; // Adjust path if needed

function HomePage() {
  return (
    <div>
      <Navbar />

      <div style={styles.imageContainer}>
        <img
          src="/hospitalimg11_bg1.png"
          alt="Hospital"
          style={styles.backgroundImage}
        />
        <div style={styles.overlay}>
          <div style={styles.headingContainer}>
            <h1 style={styles.heading}>WELCOME TO JVJ MEDICITY HOSPITAL</h1>
            <p style={styles.subText}>Book your appointments now and let us help you get well.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  imageContainer: {
    width: "100%",
    height: "calc(200vh - 80px)",
    overflow: "hidden",
    position: "relative"
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "center",
    color: "#fff",
    padding: "2rem",
  },
  headingContainer: {
    maxWidth: "700px",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "rgba(241, 241, 245, 1)",
    backgroundColor: "rgba(101, 92, 92, 0.4)"
  },
  subText: {
    fontSize: "1.5rem",
    fontWeight: "500",
    color: "rgb(246, 237, 237)"
  },
};

export default HomePage;
