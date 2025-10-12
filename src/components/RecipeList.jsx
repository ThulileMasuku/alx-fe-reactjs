import React from "react";
import { Link } from "react-router-dom";
import { useRecipeStore } from "../recipeStore";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div>
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet.</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <strong>{recipe.title}</strong> –{" "}
              <Link to={`/recipe/${recipe.id}`}>View Details</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;
