import { createContext } from 'react';

// Create a UserContext and export it.
// It will be consumed by components that need user data.
const UserContext = createContext(null);

export default UserContext;
