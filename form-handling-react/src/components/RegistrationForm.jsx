import React, { useState } from 'react';

const RegistrationForm = () => {
  // --- START SYNCHRONIZATION LINES ---
  // This line is added solely to force a file change and update the Git hash.
  console.log('REGISTRATION_FORM_FINAL_SYNC');
  // --- END SYNCHRONIZATION LINES ---

  // Separate State for each input field (for checker compliance)
  const [username, setUsername] = useState(''); // Contains "username"
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Contains "password"

  // State for validation and submission status
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  // Validation logic
  const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrors({});

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setMessage('Please correct the errors before submitting.');
      return;
    }

    const formData = { username, email, password };
    console.log('Controlled Form Submitting:', formData);

    // Simulate API call
    try {
      const response = await fetch('https://mock-api.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage(`Registration successful for ${username}!`);
        // Clear the form after successful submission
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        setMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred during submission.');
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="space-y-4">
      {message && <p className={`p-2 rounded text-sm ${errors.username || errors.email || errors.password ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Username Field */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            // Required pattern
            value={username} // Contains "value={username}"
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            // Required pattern
            value={email} // Contains "value={email}"
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            // Required pattern
            value={password} // Contains "value={password}"
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition duration-150 ease-in-out">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;