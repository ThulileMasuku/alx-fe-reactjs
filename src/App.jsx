import React, { createContext, useContext } from 'react';

// Step 1: Create a UserContext
// This context will hold the user data.
const UserContext = createContext(null);

// UserDetails Component (Consumes the context)
// This component now uses the useContext hook to get the userData directly.
function UserDetails() {
  // Step 3: Consume Context in UserDetails
  // Use the useContext hook to access the value provided by the provider.
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

// UserInfo Component (No longer receives a prop)
// This component now serves purely as a container for UserDetails.
function UserInfo() {
  // Step 4: Remove Unused Props
  // The `userData` prop is no longer needed here.
  return <UserDetails />;
}

// ProfilePage Component (No longer receives a prop)
// This component also serves purely as a container.
function ProfilePage() {
  // Step 4: Remove Unused Props
  // The `userData` prop is no longer needed here.
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="p-8 border rounded-xl shadow-2xl bg-white max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">User Profile</h1>
        <UserInfo />
      </div>
    </div>
  );
}

// App Component (Provides the context)
// This is the root component where the context provider is located.
function App() {
  // The user data is defined here, at the top level.
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  // Step 2: Provide Context in App
  // Wrap the ProfilePage component with UserContext.Provider.
  // The `value` prop is where you pass the data you want to make available.
  return (
    <UserContext.Provider value={userData}>
      <ProfilePage />
    </UserContext.Provider>
  );
}

export default App;
