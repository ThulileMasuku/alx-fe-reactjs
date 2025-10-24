import React from 'react';
// Step 1: Import necessary components from react-router-dom
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import RecipeDetail from './components/RecipeDetail'; // We will create this next

function App() {
  return (
    // Step 1: Set up the Router and Routes
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Route with a dynamic parameter :id */}
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;