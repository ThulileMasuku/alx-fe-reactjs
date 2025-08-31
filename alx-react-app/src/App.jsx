// src/App.jsx
import React from "react";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div>
      <h1>My App</h1>
      
      {/* Example usage of UserProfile */}
      <UserProfile
        name="Alice"
        age={25}
        bio="Loves hiking and photography"
      />

      <UserProfile
        name="Bob"
        age={30}
        bio="Software engineer who enjoys chess and cycling"
      />
    </div>
  );
}

export default App;

