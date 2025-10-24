import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// 1. Define the validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const FormikForm = () => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initial values for the form
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  // 2. Define the submission handler
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setMessage('');
    setIsSubmitting(true);
    
    // Simulate API call
    console.log('Formik submitting data:', values);
    try {
      const response = await fetch('https://mock-api.com/register', { // Mock API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setMessage(`Formik Registration successful for ${values.username}!`);
        resetForm(); // Clear the form
      } else {
        setMessage('Formik Registration failed. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred during Formik submission.');
      console.error('Formik submission error:', error);
    } finally {
      setSubmitting(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '20px auto', border: '1px solid #2ecc71' }}>
      <h2>Formik Registration</h2>
      {message && <p style={{ color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>}

      {/* 3. Formik Wrapper Component */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {/* 4. Form and Field components */}
        <Form>
          <div>
            <label htmlFor="username">Username:</label>
            <Field name="username" type="text" />
            <ErrorMessage name="username" component="div" style={{ color: 'red', fontSize: '0.8em' }} />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" style={{ color: 'red', fontSize: '0.8em' }} />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" style={{ color: 'red', fontSize: '0.8em' }} />
          </div>

          <button type="submit" disabled={isSubmitting} style={{ marginTop: '10px' }}>
            {isSubmitting ? 'Registering...' : 'Register with Formik'}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormikForm;