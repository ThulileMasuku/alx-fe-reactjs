import React from 'react';
import { useNavigate } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

const DeleteRecipeButton = ({ recipeId, onDelete, redirectTo }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipeId);

      // Call the optional callback
      if (onDelete) onDelete();

      // Navigate if a redirect path is provided
      if (redirectTo) {
        navigate(redirectTo);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
