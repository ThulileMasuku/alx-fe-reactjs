import React from 'react';
import DeleteRecipeButton from './DeleteRecipeButton';
import useRecipeStore from '../store/recipeStore';

const RecipeCard = ({ recipe }) => {
  const recipes = useRecipeStore((state) => state.recipes);

  const handleAfterDelete = () => {
    console.log(`Recipe ${recipe.id} deleted!`);
    // You can trigger any state updates or toast notifications here
  };

  return (
    <div className="border p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
      <p className="text-gray-700 mb-4">{recipe.description}</p>

      <DeleteRecipeButton
        recipeId={recipe.id}
        onDelete={handleAfterDelete}
        redirectTo="/recipes" // Optional: redirect after deletion
      />
    </div>
  );
};

export default RecipeCard;
