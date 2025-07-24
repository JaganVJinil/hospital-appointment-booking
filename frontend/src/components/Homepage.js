import React from "react";
import Navbar from "./Navbar";
import BackgroundWrapper from "./BackgroundWrapper";

function HomePage() {
  return (
    <div>
      <Navbar />
      <BackgroundWrapper>
        <div style={styles.container}>
          <h1 style={styles.heading}>WELCOME TO JVJ SUPER SPECIALITY HOSPITAL</h1>
          <div style={styles.section}>
            <h2 style={styles.subHeading}>Our Vision</h2>
            <p style={styles.text}>
              To be the most trusted healthcare provider, offering excellence in medical service, patient care, and innovation for a healthier tomorrow.
            </p>
          </div>
          <div style={styles.section}>
            <h2 style={styles.subHeading}>Our Mission</h2>
            <p style={styles.text}>
              To deliver compassionate, affordable, and world-class healthcare through advanced technology, skilled professionals, and a commitment to healing.
            </p>
          </div>
        </div>
      </BackgroundWrapper>
    </div>
  );
}

const styles = {
  container: {
    padding: "4rem 2rem",
    color: "#fff",
    textAlign: "center",
    maxWidth: "100%",
    margin: "0 auto",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: "12px",
  },
  heading: {
    fontSize: "2.8rem",
    fontWeight: "bold",
    marginBottom: "2rem",
    color: "#f1f1f5",
  },
  section: {
    marginBottom: "2rem",
  },
  subHeading: {
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#ffc107",
  },
  text: {
    fontSize: "1.2rem",
    color: "#f5f5f5",
    lineHeight: 1.6,
    marginTop: "0.5rem",
  },
};

export default HomePage;
