import React, { useState } from 'react';

const RegistrationForm = () => {
  // 1. State for form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // 2. State for validation and submission status
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  // 3. Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 4. Basic validation logic
  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  // 5. Handle form submission
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

    // Simulate API call
    console.log('Submitting data:', formData);
    try {
      const response = await fetch('https://mock-api.com/register', { // Mock API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage(`Registration successful for ${formData.username}!`);
        // Clear the form after successful submission
        setFormData({ username: '', email: '', password: '' });
      } else {
        // Handle non-200 responses
        setMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred during submission.');
      console.error('Submission error:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc' }}>
      <h2>Controlled Component Registration</h2>
      {message && <p style={{ color: errors.username || errors.email || errors.password ? 'red' : 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{ borderColor: errors.username ? 'red' : '' }}
          />
          {errors.username && <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.username}</p>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ borderColor: errors.email ? 'red' : '' }}
          />
          {errors.email && <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ borderColor: errors.password ? 'red' : '' }}
          />
          {errors.password && <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.password}</p>}
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;