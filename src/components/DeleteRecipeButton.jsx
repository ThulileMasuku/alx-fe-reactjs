import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

function DeleteRecipeButton({ recipeId }) {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();

  return <button onClick={() => { deleteRecipe(recipeId); navigate("/"); }}>Delete</button>;
}

export default DeleteRecipeButton;
