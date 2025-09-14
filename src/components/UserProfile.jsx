import React, { useContext } from "react";
import UserContext from "./UserContext";

function UserProfile() {
  const userData = useContext(UserContext);

  return (
    <div>
      <h2>{userData.name}</h2>
      <p>{userData.email}</p>
    </div>
  );
}

export default UserProfile;