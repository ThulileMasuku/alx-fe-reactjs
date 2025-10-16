import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === parseInt(id))
  );
  const [isEditing, setIsEditing] = useState(false);

  if (!recipe) {
    return (
      <div>
        <h2>Recipe not found</h2>
        <button onClick={() => navigate('/')}>Back to Recipes</button>
      </div>
    );
  }

  if (isEditing) {
    return (
      <EditRecipeForm
        recipe={recipe}
        onCancel={() => setIsEditing(false)}
        onSave={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="recipe-details">
      <button onClick={() => navigate('/')}>← Back to Recipes</button>
      
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <div className="ingredients">
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="instructions">
        <h2>Instructions</h2>
        <p>{recipe.instructions}</p>
      </div>

      <div className="actions">
        <button onClick={() => setIsEditing(true)}>Edit Recipe</button>
        <DeleteRecipeButton recipeId={recipe.id} onDelete={() => navigate('/')} />
      </div>
    </div>
  );
};

export default RecipeDetails;