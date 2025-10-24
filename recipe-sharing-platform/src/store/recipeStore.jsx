// src/store/recipeStore.jsx
import { create } from "zustand";

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  filteredRecipes: [],
  searchTerm: "",

  // Actions
  setRecipes: (recipes) => {
    set({ recipes, filteredRecipes: recipes });
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes(); // Re-filter when search term changes
  },

  filterRecipes: () => {
    const { recipes, searchTerm } = get();

    const filtered = recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (recipe.ingredients &&
          recipe.ingredients.some((ing) =>
            ing.toLowerCase().includes(searchTerm.toLowerCase())
          ))
    );

    set({ filteredRecipes: filtered });
  },
}));
