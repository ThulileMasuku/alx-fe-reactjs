import React from 'react';
import { useRecipeStore } from '../store/recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);

  // compute filtered list safely
  const displayRecipes = React.useMemo(() => {
    if (!searchTerm) return recipes;
    return recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [recipes, searchTerm]);

  return (
    <div>
      {displayRecipes.length > 0 ? (
        displayRecipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              border: '1px solid #eee',
              padding: '15px',
              borderRadius: '10px',
              marginBottom: '10px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
            }}
          >
            <h3>{recipe.title}</h3>
            <p>
              <strong>Ingredients:</strong> {recipe.ingredients.join(', ')}
            </p>
            <p>
              <strong>Prep Time:</strong> {recipe.time} min
            </p>
          </div>
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default RecipeList;