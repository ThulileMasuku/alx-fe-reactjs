import React from 'react';
// Adjust the path if your recipeStore is not in the same directory
import useRecipeStore from './recipeStore.jsx'; 

const SearchBar = () => {
  // Get the action to update the search term from the store
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);

  return (
    <input
      type="text"
      placeholder="🔍 Search recipes by title..."
      style={{ padding: '10px', fontSize: '16px', margin: '10px 0', width: '300px' }} // Basic styling
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchBar;