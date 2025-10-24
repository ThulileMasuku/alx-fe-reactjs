import React, { useState } from 'react';
import useRecipeStore from './recipeStore';

const EditRecipeForm = ({ recipe, onCancel, onSave }) => {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  const [formData, setFormData] = useState({
    title: recipe.title,
    description: recipe.description,
    ingredients: recipe.ingredients ? recipe.ingredients.join('\n') : '',
    instructions: recipe.instructions || ''
  });

  const handleSubmit = (event) => {
    event.preventDefault(); // <-- renamed from e.preventDefault()

    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedRecipe = {
      ...recipe,
      title: formData.title,
      description: formData.description,
      ingredients: formData.ingredients.split('\n').filter(i => i.trim()),
      instructions: formData.instructions
    };

    updateRecipe(updatedRecipe);
    if (onSave) onSave();
  };

  return (
    <div className="edit-recipe-form">
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Recipe Title:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(event) => setFormData({ ...formData, title: event.target.value })}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={formData.description}
            onChange={(event) => setFormData({ ...formData, description: event.target.value })}
            required
          />
        </div>

        <div>
          <label>Ingredients (one per line):</label>
          <textarea
            value={formData.ingredients}
            onChange={(event) => setFormData({ ...formData, ingredients: event.target.value })}
            rows="6"
          />
        </div>

        <div>
          <label>Instructions:</label>
          <textarea
            value={formData.instructions}
            onChange={(event) => setFormData({ ...formData, instructions: event.target.value })}
            rows="6"
          />
        </div>

        <div className="form-actions">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipeForm;
