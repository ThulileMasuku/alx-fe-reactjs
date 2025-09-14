import React from "react";
import ProfilePage from "./components/ProfilePage";
import UserContext from "./components/UserContext";

function App() {
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    // add other user properties as needed
  };

  return (
    <UserContext.Provider value={userData}>
      <ProfilePage />
    </UserContext.Provider>
  );
}

export default App;
