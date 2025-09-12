import React, { useContext } from 'react';
import UserContext from './UserContext.js';

// This component now consumes the UserContext directly.
function UserDetails() {
  const userData = useContext(UserContext);

  if (!userData) {
    return <div>User data not available.</div>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-inner">
      <p className="font-semibold text-lg">Name: <span className="font-normal">{userData.name}</span></p>
      <p className="font-semibold text-lg">Email: <span className="font-normal">{userData.email}</span></p>
    </div>
  );
}

export default UserDetails;
