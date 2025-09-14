import React, { useContext } from 'react'; // ✅ Import React and useContext
import UserContext from '../UserContext';   // ✅ Import UserContext

function UserProfile() {
  const userData = useContext(UserContext); // ✅ Consume context

  return (
    <div>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserProfile;
