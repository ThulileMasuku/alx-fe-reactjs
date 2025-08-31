// src/components/UserProfile.jsx
import React from "react";

const UserProfile = (props) => {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "16px",
      borderRadius: "12px",
      maxWidth: "250px",
      margin: "10px auto",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    }}>
      <h2>{props.name}</h2>
      <p><strong>Age:</strong> {props.age}</p>
      <p>{props.bio}</p>
    </div>
  );
};

export default UserProfile;
