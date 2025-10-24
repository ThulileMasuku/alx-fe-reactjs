import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, About, Profile, ProfileDetails, ProfileSettings, BlogPost, Layout } from './App';
import ProtectedRoute, { AuthProvider } from './components/ProtectedRoute';

// 🗺️ Route Definitions
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Main layout wrapper
    children: [
      {
        index: true, // Default route for '/'
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      // 📚 Dynamic Routing Example
      {
        path: 'blog/:postId', // The ':postId' creates a dynamic segment
        element: <BlogPost />,
      },
      // 🛡️ Protected Route Setup
      {
        // Only authenticated users can access the 'profile' path and its children
        element: <ProtectedRoute><Profile /></ProtectedRoute>, 
        path: 'profile',
        // 🧩 Nested Routes
        children: [
          {
            index: true, // Default nested route for '/profile'
            element: <ProfileDetails />,
          },
          {
            path: 'details', // Path: /profile/details
            element: <ProfileDetails />,
          },
          {
            path: 'settings', // Path: /profile/settings
            element: <ProfileSettings />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 🔑 Wrap the entire application with the AuthProvider */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);