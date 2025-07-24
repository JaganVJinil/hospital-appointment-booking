import React from "react";

const styles = {
  wrapper: {
    position: "relative",
    minHeight: "100vh",
    overflow: "auto", // Ensure scroll works
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1,
  },
  content: {
    position: "relative",
    zIndex: 2, // Bring your doctor details above the overlay
    padding: "2rem",
  },
};

function BackgroundWrapper({ children }) {
  return (
    <div style={styles.wrapper}>
      <img
        src="/Newhospitalimg11_bg1.png"
        alt="Background"
        style={styles.backgroundImage}
      />
      <div style={styles.overlay}></div>
      <div style={styles.content}>{children}</div>
    </div>
  );
}

export default BackgroundWrapper;
