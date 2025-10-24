import create from 'zustand';

// Function to compute filtered recipes (extracted for clarity)
const computeFilteredRecipes = (state) => {
  if (!state.searchTerm) {
    return state.recipes; // Return all recipes if no search term
  }
  
  const lowerCaseTerm = state.searchTerm.toLowerCase();

  return state.recipes.filter(recipe =>
    // Basic search: checks recipe title
    recipe.title.toLowerCase().includes(lowerCaseTerm)
    // You could expand this to include ingredients or other fields if available:
    // || (recipe.ingredients && recipe.ingredients.some(ing => ing.toLowerCase().includes(lowerCaseTerm)))
  );
};

const useRecipeStore = create((set, get) => ({
  // Existing state (assuming you have a recipes array)
  recipes: [
    // Add some initial dummy recipes for testing if your array is currently empty
    { id: 1, title: "Spicy Chicken Curry", ingredients: ["chicken", "curry powder", "onion"] },
    { id: 2, title: "Vegetable Soup", ingredients: ["carrot", "celery", "broth"] },
    { id: 3, title: "Chocolate Cake", ingredients: ["flour", "sugar", "cocoa"] },
  ],
  
  // New State for Search
  searchTerm: '',
  filteredRecipes: [], // This will hold the results

  // New Actions for Search
  setSearchTerm: (term) => {
    // 1. Update the search term
    set({ searchTerm: term }); 
    // 2. Immediately call the filtering logic after setting the term
    get().filterRecipes(term); 
  },
  
  filterRecipes: (term = get().searchTerm) => {
    // This action can be called explicitly, but it's now mainly driven by setSearchTerm
    const state = get();
    // Use the function to compute and set the filtered array
    set({
      filteredRecipes: computeFilteredRecipes(state)
    });
  },

  // Initialize filteredRecipes on store creation
  // This will set the initial filteredRecipes to be the full recipes list
  initializeStore: () => {
      const state = get();
      set({ filteredRecipes: state.recipes });
  }
}));

// Call initialize on creation (optional, but ensures initial state is correct)
useRecipeStore.getState().initializeStore();

export default useRecipeStore;