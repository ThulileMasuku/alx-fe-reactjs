import React from 'react';
import UserDetails from './UserDetails.jsx';

// This component no longer needs to receive the userData prop.
function UserInfo() {
  return <UserDetails />;
}

export default UserInfo;
