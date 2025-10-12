import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecipeStore } from "../recipeStore";

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteRecipe(recipeId);
    alert("Recipe deleted!");
    navigate("/");
  };

  return (
    <button
      onClick={handleDelete}
      style={{ background: "red", color: "white", marginTop: "10px" }}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
