import React from "react";

function MainContent() {
  return (
    <main
      style={{
        padding: "20px",
        backgroundColor: "#f9f9f9",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#333" }}>Welcome to My City App</h2>
      <p style={{ lineHeight: 1.6 }}>
        Explore profiles of amazing cities and their unique features.
      </p>
      <p style={{ marginTop: "10px", fontStyle: "italic" }}>
        I love to visit New York, Paris, and Tokyo.
      </p>
    </main>
  );
}

export default MainContent;

