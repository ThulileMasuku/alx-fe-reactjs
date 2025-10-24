import React, { useState, useEffect } from 'react';
// Step 2: Use the useParams hook to get the ID from the URL
import { useParams, Link } from 'react-router-dom';
import recipesData from '../data.json'; // Import the mock data

const RecipeDetail = () => {
  // Get the 'id' parameter from the URL
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  // Step 2: Fetch the recipe data based on the ID
  useEffect(() => {
    setLoading(true);
    // Convert the string ID from useParams to a number for comparison
    const recipeId = parseInt(id); 
    
    // Find the specific recipe in the mock data
    const foundRecipe = recipesData.find(r => r.id === recipeId);

    setTimeout(() => {
      setRecipe(foundRecipe);
      setLoading(false);
    }, 300); // Simulate a short delay
  }, [id]); // Re-run effect if the ID changes (though usually unnecessary here)


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-xl text-indigo-600">Loading recipe details...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center p-10 min-h-screen bg-gray-50">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Recipe Not Found 😔</h2>
        <Link to="/" className="text-indigo-600 hover:text-indigo-800 transition duration-150">
          Go back to Home
        </Link>
      </div>
    );
  }

  // Step 3: Style the Recipe Detail Page with Tailwind CSS
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
        
        {/* Header Section */}
        <div className="relative">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-96 object-cover" 
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
            <h1 className="text-5xl font-extrabold text-white leading-tight">
              {recipe.title}
            </h1>
          </div>
        </div>

        {/* Recipe Summary and Details */}
        <div className="p-6 md:p-10">
          <p className="text-xl text-gray-700 italic mb-8 border-b pb-4">
            {recipe.summary}
          </p>

          {/* Ingredients and Instructions Layout (Responsive Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Ingredients Card Section */}
            <section className="bg-indigo-50 p-6 rounded-lg shadow-inner">
              <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b border-indigo-300 pb-2">
                Ingredients 🥕
              </h2>
              <ul className="space-y-3 list-none p-0">
                {recipe.ingredients.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700">
                    <span className="text-indigo-600 font-bold mr-3">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Instructions Section */}
            <section className="bg-white p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                Instructions 👨‍🍳
              </h2>
              <ol className="space-y-4 list-decimal pl-5">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="text-gray-700 leading-relaxed">
                    <span className="font-semibold text-gray-900">Step {index + 1}:</span> {step}
                  </li>
                ))}
              </ol>
            </section>
          </div>
          
          {/* Back Button */}
          <div className="mt-10 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150"
            >
              ← Back to All Recipes
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;