import React from 'react';
import UserInfo from './UserInfo.jsx';

// This component no longer needs to receive the userData prop.
function ProfilePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="p-8 border rounded-xl shadow-2xl bg-white max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">User Profile</h1>
        <UserInfo />
      </div>
    </div>
  );
}

export default ProfilePage;
