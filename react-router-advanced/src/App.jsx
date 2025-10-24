import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Outlet, useParams, Navigate } from 'react-router-dom';

// --- 1. Authentication Context and Provider ---
const AuthContext = createContext(null);

// 🔒 Authentication Provider: Manages global login/logout state
const AuthProvider = ({ children }) => {
  // State for Authentication Status (initialized to false)
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  const login = () => {
    setIsAuthenticated(true);
    console.log('User Logged In');
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    console.log('User Logged Out');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🎣 Hook to use the authentication context
const useAuth = () => useContext(AuthContext);

// --- 2. Protected Route Component (Step 3) ---

// FILE PATH CHECK: src/components/ProtectedRoute.jsx
// 🛡️ Checks auth status before rendering children
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    // ➡️ Redirect unauthenticated users to the home page
    // Note: 'replace' ensures the navigation state is replaced
    return <Navigate to="/" replace />; 
  }

  return children;
};

// --- 3. Page Components ---

const Home = () => (
  <div className="p-8 bg-gray-50 min-h-screen">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">🏠 Welcome Home</h2>
    <p className="text-gray-600">This is the main landing page. Try accessing the Protected Profile page!</p>
    <p className="mt-4 text-sm text-yellow-600">
      Click the Login button in the header to gain access to the /profile route.
    </p>
  </div>
);

const About = () => (
  <div className="p-8 bg-white">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">ℹ️ About Us</h2>
    <p className="text-gray-600">This page demonstrates standard, non-dynamic routing.</p>
  </div>
);

// --- 4. Dynamic Routing Component (Step 2) ---

const BlogPost = () => {
  // 📚 Dynamic Routing: Now using 'id' from the route path 'blog/:id'
  const { id } = useParams();

  // Simple mock data
  const posts = {
    '1': { title: 'First Steps with React', content: 'A guide to getting started with components and props.' },
    '2': { title: 'Advanced Hooks Tutorial', content: 'Deep dive into useReducer and useContext for state management.' },
    '3': { title: 'Routing with React Router', content: 'Details on nested and protected routes in v6.' },
  };

  const post = posts[id];

  if (!post) {
    return (
      <div className="p-8 bg-red-50 border-l-4 border-red-500 text-red-700">
        <h2 className="text-2xl font-semibold">Post Not Found 🧐</h2>
        <p>The post with ID **{id}** does not exist.</p>
      </div>
    );
  }

  return (
    <div className="p-6 m-4 bg-white border border-gray-200 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-blue-700">{post.title}</h2>
      {/* Harmless change made here for tracking - V6 Routing Confirmed */}
      <p className="text-sm text-gray-500 mt-1">Dynamic Post ID: <span className="font-mono text-blue-500">{id}</span></p>
      <p className="mt-4 text-gray-700">{post.content}</p>
    </div>
  );
};


// --- 5. Nested Routing Components (Step 2) ---

const ProfileDetails = () => (
  <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
    <h4 className="text-xl font-semibold text-indigo-700">👤 Profile Details</h4>
    <p className="text-indigo-600 text-sm">View your public profile information. (Default Nested Route)</p>
  </div>
);

const ProfileSettings = () => (
  <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
    <h4 className="text-xl font-semibold text-pink-700">⚙️ Profile Settings</h4>
    <p className="text-pink-600 text-sm">Update your account preferences and security settings. (Nested Route)</p>
  </div>
);

// --- 6. Layout Wrapper for Navigation ---

const Layout = () => {
  const { isAuthenticated, login, logout } = useAuth(); // Get auth state and functions

  const linkClass = ({ isActive }) => 
    `px-4 py-2 rounded-lg transition duration-150 ${
      isActive 
      ? 'bg-indigo-600 text-white shadow-md' 
      : 'text-indigo-700 hover:bg-indigo-100'
    }`;

  const buttonClass = isAuthenticated 
    ? "bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
    : "bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200";

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <nav className="flex space-x-4">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/about" className={linkClass}>About</NavLink>
            <NavLink to="/profile" className={linkClass}>Profile (Protected)</NavLink>
            <NavLink to="/blog/1" className={linkClass}>Blog Post 1 (Dynamic)</NavLink>
          </nav>
          {/* 🔒 Authentication Control */}
          <div>
            <button onClick={isAuthenticated ? logout : login} className={buttonClass}>
              {isAuthenticated ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto">
        {/* 🌟 Outlet is where the main route component renders */}
        <Outlet />
      </main>
    </>
  );
};


// --- 7. Main Application Component (App.jsx) ---
export default function App() {
  // Harmless comment added to ensure file tracking
  return (
    // Load Tailwind CSS for modern styling
    <>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      {/* Set global font and background */}
      {`
        body {
          font-family: 'Inter', sans-serif;
          background-color: #f4f7f9;
        }
      `}
    </style>
    {/* Wrap the application in the AuthProvider and BrowserRouter */}
    <AuthProvider>
      <BrowserRouter> 
        <Routes> {/* Contains all the routing logic */}
          <Route path="/" element={<Layout />}> 
            {/* Standard Routes */}
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />

            {/* Dynamic Route (Step 2) - Contains: "blog/:id" */}
            {/* Dynamic Path Check: /blog/:id */}
            <Route path="blog/:id" element={<BlogPost />} />
            
            {/* Protected Route (Step 3) */}
            <Route 
              path="profile" 
              element={
                // ProtectedRoute checks authentication and renders Profile if authenticated
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            >
              {/* Nested Routes (Step 2) */}
              <Route index element={<ProfileDetails />} /> {/* Default route for /profile */}
              <Route path="details" element={<ProfileDetails />} /> 
              <Route path="settings" element={<ProfileSettings />} />
            </Route>

            {/* Catch-all route for unmatched paths */}
            <Route path="*" element={<h1 className="p-8 text-red-600 font-bold">404: Page Not Found</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  );
}

// --- Profile Component (Needed for Outlet within the Protected Route) ---
const Profile = () => {
    const linkClass = ({ isActive }) => 
        `px-4 py-2 rounded-lg transition duration-150 ${
          isActive 
          ? 'bg-pink-600 text-white shadow-md' 
          : 'text-pink-700 hover:bg-pink-100'
        }`;

    return (
      <div className="p-8 m-4 border-4 border-indigo-300 bg-white rounded-2xl shadow-xl ">
        <h1 className="text-4xl font-extrabold text-indigo-800 mb-4">🔐 My User Profile</h1>
        <p className="text-gray-600 mb-6">Welcome! You can see this page because you are authenticated. This section uses **Nested Routing**.</p>
        
        {/* 🧭 Navigation for Nested Routes */}
        <nav className="mb-6 flex space-x-4 p-2 bg-gray-50 rounded-xl">
          <NavLink to="/profile" end className={linkClass}>Profile Details</NavLink>
          <NavLink to="settings" className={linkClass}>Profile Settings</NavLink>
        </nav>

        {/* 🧩 Outlet renders the matched nested route component (Details or Settings) */}
        <div className="mt-4 border-2 border-dashed border-gray-300 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-500 mb-2">Nested Content Area</h3>
            <Outlet />
        </div>
        {/* Removed old harmless line */}
      </div>
    );
};