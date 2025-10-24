import React, { useState, useEffect } from 'react';
// FIX: Import Link component for client-side navigation
import { Link } from 'react-router-dom';
import recipesData from '../data.json'; // Import the mock data

// Define the Recipe Card Component to keep the main component clean
const RecipeCard = ({ recipe }) => {
  return (
    // The entire card is now wrapped in a Link for easy navigation
    <Link to={`/recipe/${recipe.id}`} className="block h-full">
      <div
        className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col
                   transform transition-all duration-300 ease-in-out
                   hover:shadow-2xl hover:scale-[1.02] cursor-pointer"
      >
        {/* Recipe Image */}
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover object-center"
        />

        {/* Recipe Details */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-800 truncate mb-2">
            {recipe.title}
          </h3>
          {/* Summary - flex-grow ensures this area pushes content down for equal card height */}
          <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
            {recipe.summary}
          </p>
          {/* Call-to-action button style (since the Link wraps the card, this is now a stylized div/text) */}
          <div
            className="mt-auto text-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg
                       hover:bg-indigo-700 transition duration-150"
          >
            View Recipe
          </div>
        </div>
      </div>
    </Link>
  );
};

// Define the Home Page Component
const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use useEffect to load data when the component mounts
  useEffect(() => {
    // Simulating a fetch delay
    setTimeout(() => {
      setRecipes(recipesData); // Load the imported mock data
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-xl text-indigo-600">Loading recipes...</p>
      </div>
    );
  }

  return (
    // Main container with padding and a background
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Discover Delicious Recipes 🍝
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          A collection of recipes shared by our community.
        </p>
      </header>

      {/* Responsive Grid Layout */}
      <div
        className="grid gap-6
                   grid-cols-1      /* 1 column on extra-small screens */
                   sm:grid-cols-2   /* 2 columns on small screens and up */
                   md:grid-cols-3   /* 3 columns on medium screens and up */
                   lg:grid-cols-4   /* 4 columns on large screens and up */
                   max-w-7xl mx-auto"
      >
        {/* Render each RecipeCard */}
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {recipes.length === 0 && (
        <div className="text-center p-8">
          <p className="text-xl text-gray-500">No recipes found.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
