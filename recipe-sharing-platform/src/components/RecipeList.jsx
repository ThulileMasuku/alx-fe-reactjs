import React, { useEffect } from 'react';
import useRecipeStore from './recipeStore.jsx'; // Make sure the import is correct

const RecipeList = () => {
  // Use the filteredRecipes array from the store
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  // Get the initialization action if you included it
  const initializeStore = useRecipeStore(state => state.initializeStore);

  // Optional: Run initialization on component mount
  useEffect(() => {
    // This ensures that when the component first mounts, the filtered list is populated with all recipes
    initializeStore();
  }, [initializeStore]);

  return (
    <div>
      {/* Check if filteredRecipes is populated */}
      {filteredRecipes.length === 0 ? (
        <p>No recipes found matching your search term.</p>
      ) : (
        filteredRecipes.map(recipe => (
          <div key={recipe.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h2>{recipe.title}</h2>
            {/* Add more recipe details here */}
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;