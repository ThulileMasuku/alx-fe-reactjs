import { create } from "zustand";

export const useRecipeStore = create((set) => ({
  recipes: [],

  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [...state.recipes, { id: Date.now(), ...recipe }],
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),

  updateRecipe: (id, updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      ),
    })),
}));
