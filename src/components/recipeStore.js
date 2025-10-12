// recipeStore.js

// Initial recipes array
let recipes = [];

/**
 * Add a new recipe
 * @param {Object} recipe - The recipe object to add
 */
export const addRecipe = (recipe) => {
  recipes.push(recipe);
};

/**
 * Update an existing recipe by id
 * @param {string|number} id - The id of the recipe to update
 * @param {Object} updatedRecipe - The new recipe data
 */
export const updateRecipe = (id, updatedRecipe) => {
  const index = recipes.findIndex((r) => r.id === id);
  if (index !== -1) {
    recipes[index] = { ...recipes[index], ...updatedRecipe };
  }
};

/**
 * Delete a recipe by id
 * @param {string|number} id - The id of the recipe to delete
 */
export const deleteRecipe = (id) => {
  recipes = recipes.filter((r) => r.id !== id);
};

/**
 * Get all recipes
 * @returns {Array} - List of recipes
 */
export const getRecipes = () => recipes;
