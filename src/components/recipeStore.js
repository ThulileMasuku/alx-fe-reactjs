import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [
    { id: 1, title: 'Spaghetti Bolognese', ingredients: ['pasta', 'meat'], time: 30 },
    { id: 2, title: 'Chicken Curry', ingredients: ['chicken', 'curry powder'], time: 40 },
    { id: 3, title: 'Avocado Toast', ingredients: ['bread', 'avocado'], time: 5 },
  ],
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
}));