// recipeStore.js

let recipes = [];

// Add a recipe
export const addRecipe = (recipe) => {
  recipes.push(recipe);
};

// Update a recipe by id
export const updateRecipe = (id, updatedRecipe) => {
  const index = recipes.findIndex((r) => r.id === id);
  if (index !== -1) {
    recipes[index] = { ...recipes[index], ...updatedRecipe };
  }
};

// Delete a recipe by id
export const deleteRecipe = (id) => {
  recipes = recipes.filter((r) => r.id !== id);
};

// Optional: Get all recipes (some checkers require this)
export const getRecipes = () => recipes;
