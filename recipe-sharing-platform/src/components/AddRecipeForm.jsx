import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddRecipeForm = () => {
  // Step 1: Form Setup - Initialize state for form fields
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    ingredients: '', // Will be parsed from textarea input
    instructions: '', // Will be parsed from textarea input
  });

  // Step 2: Implement Form Validation - State for errors and submission status
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handles input changes for all fields
  const handleChange = (e) => {
    // FIX: Using e.target.name and e.target.value directly instead of destructuring
    const name = e.target.name;
    const value = e.target.value; 

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  // Step 2: Validation Logic
  const validate = () => {
    let newErrors = {};
    let isValid = true;

    // Check for empty fields
    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required.';
      isValid = false;
    }
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients list is required.';
      isValid = false;
    }
    if (!formData.instructions.trim()) {
      newErrors.instructions = 'Preparation steps are required.';
      isValid = false;
    }
    // Simple URL validation (Optional, using a placeholder check for simplicity)
    if (!formData.image.startsWith('http')) {
        newErrors.image = 'Image URL must start with http/https.';
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');
    
    if (validate()) {
      setIsSubmitting(true);
      
      // *** Conceptual Submission Logic ***
      // In a real application, you would send this data to a database (e.g., Firestore).
      // Here, we simulate a successful API call.
      
      // Process ingredients and instructions into an array (conceptually)
      const newRecipe = {
        id: Date.now(), // Use timestamp for a unique ID
        ...formData,
        ingredients: formData.ingredients.split('\n').map(item => item.trim()).filter(item => item),
        instructions: formData.instructions.split('\n').map(step => step.trim()).filter(step => step),
      };

      console.log('New Recipe Submitted (Simulated):', newRecipe);

      setTimeout(() => {
        setIsSubmitting(false);
        setSuccessMessage('🎉 Recipe submitted successfully! Thank you for sharing.');
        // Reset the form after successful submission
        setFormData({ title: '', image: '', ingredients: '', instructions: '' });
        setErrors({});
      }, 1500);
      
    } else {
      console.log('Validation failed', errors);
    }
  };

  // Step 3: Style the Form with Tailwind CSS (Responsive Layout)
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex justify-center items-start">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-xl p-6 md:p-10">
        
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700">
            Share Your Recipe 🥘
          </h1>
          <p className="text-gray-500 mt-2">
            Fill out the details below to add a new culinary masterpiece to the platform.
          </p>
        </header>

        {/* Success Message Display */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-6 transition duration-300 ease-in-out">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          
          {/* Top Row: Title and Image URL (Responsive: stacks on mobile, side-by-side on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Recipe Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150`}
                placeholder="e.g., Grandma's Apple Pie"
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
            </div>

            {/* Image URL Input */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL (Thumbnail)
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.image ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150`}
                placeholder="https://example.com/pie.jpg"
              />
              {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
            </div>
          </div>

          {/* Ingredients Textarea */}
          <div className="mb-6">
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">
              Ingredients (One item per line)
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              rows="6"
              value={formData.ingredients}
              onChange={handleChange}
              className={`w-full p-3 border ${errors.ingredients ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 resize-y`}
              placeholder="e.g.,&#10;2 cups flour&#10;1 cup sugar&#10;4 apples"
            ></textarea>
            {errors.ingredients && <p className="mt-1 text-sm text-red-500">{errors.ingredients}</p>}
          </div>

          {/* Instructions Textarea */}
          <div className="mb-8">
            <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
              Preparation Steps (One step per line)
            </label>
            <textarea
              id="instructions"
              name="instructions"
              rows="8"
              value={formData.instructions}
              onChange={handleChange}
              className={`w-full p-3 border ${errors.instructions ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 resize-y`}
              placeholder="e.g.,&#10;1. Preheat oven to 350°F.&#10;2. Mix dry ingredients in a bowl.&#10;3. Bake for 45 minutes."
            ></textarea>
            {errors.instructions && <p className="mt-1 text-sm text-red-500">{errors.instructions}</p>}
          </div>

          {/* Submit Button and Link to Home */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto px-6 py-3 text-lg font-semibold rounded-lg shadow-lg 
                          transition duration-300 ease-in-out transform hover:scale-[1.01] 
                          ${isSubmitting
                            ? 'bg-indigo-300 cursor-not-allowed'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-xl'
                          }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Recipe'}
            </button>
            
            {/* Back Link */}
            <Link 
              to="/" 
              className="w-full sm:w-auto text-center px-6 py-3 text-base font-medium rounded-lg text-gray-600 border border-gray-300 hover:border-indigo-600 hover:text-indigo-600 transition duration-150"
            >
              ← Back to Home
            </Link>

          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;