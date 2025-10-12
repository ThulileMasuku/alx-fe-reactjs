// src/components/recipeStore.js
import create from "zustand";

const useRecipeStore = create((set) => ({
  recipes: [],

  // Add a single recipe
  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [...state.recipes, recipe],
    })),

  // Replace all recipes (setter)
  setRecipes: (recipes) => set({ recipes }),
}));

export default useRecipeStore;
