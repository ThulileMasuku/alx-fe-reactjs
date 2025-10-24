import UserProfile from './components/UserProfile'
import './App.css' // Keep this if you have any global app styling, though typically not needed with Tailwind

function App() {
  return (
    <div className="min-h-screen bg-white"> 
      {/* A simple container for the page content. min-h-screen to ensure full height. */}
      <UserProfile />
    </div>
  )
}

export default App