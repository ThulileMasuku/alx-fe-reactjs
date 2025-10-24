import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Profile = () => {
  return (
    <div style={{ padding: '20px', border: '2px solid #333', margin: '10px' }}>
      <h1>My User Profile</h1>
      <p>This page requires authentication and contains nested routes.</p>
      
      {/* 🧭 Navigation for Nested Routes */}
      <nav style={{ marginBottom: '20px' }}>
        <NavLink 
          to="details" 
          style={({ isActive }) => ({ margin: '0 10px', fontWeight: isActive ? 'bold' : 'normal' })}
        >
          Details
        </NavLink>
        <NavLink 
          to="settings" 
          style={({ isActive }) => ({ margin: '0 10px', fontWeight: isActive ? 'bold' : 'normal' })}
        >
          Settings
        </NavLink>
        {/* Note: The "details" route will be set as the index route in App.jsx */}
      </nav>

      {/* 🧩 Outlet renders the matched nested route component (ProfileDetails or ProfileSettings) */}
      <Outlet />
    </div>
  );
};

export default Profile;