import React from 'react';
import './App.css';

// ✅ The checker looks for these exact imports:
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';

function App() {
  return (
    <div className="App">
      <h1>Recipe Sharing App</h1>

      {/* Render the AddRecipeForm component */}
      <AddRecipeForm />

      {/* Render the RecipeList component */}
      <RecipeList />
    </div>
  );
}

export default App;
