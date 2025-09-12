// src/components/UserDetails.jsx
import { useContext } from 'react';
import UserContext from '../UserContext'; // One level up

function UserDetails() {
  const userData = useContext(UserContext);

  return (
    <div>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserDetails;
