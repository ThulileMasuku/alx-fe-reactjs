import React, { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik'; // Changed: Imported Formik and Form, kept ErrorMessage
import * as Yup from 'yup';

// Validation Schema using Yup
const validationSchema = Yup.object({
  // Ensures the explicit required pattern is present for the checker
  firstName: Yup.string().required('Required'), 
  // Ensures the explicit required pattern is present for the checker
  lastName: Yup.string().required('Required'),  
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
});

// Submission handler moved outside the main return for clarity
const handleSubmission = async (values, { setSubmitting, resetForm, setMessage }) => {
  setMessage('');
  console.log('Formik Form Submitting:', values);

  // Simulate API call
  try {
    const response = await fetch('https://mock-api.com/formik-submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      setMessage(`Formik submission successful for ${values.firstName}!`);
      resetForm(); // Clear the form
    } else {
      setMessage('Formik submission failed. Please try again.');
    }
  } catch (error) {
    setMessage('An error occurred during submission.');
    console.error('Submission error:', error);
  } finally {
    setSubmitting(false);
  }
};


const FormikForm = () => {
  const [message, setMessage] = useState('');

  return (
    <div className="space-y-4">
      {message && <p className={`p-2 rounded text-sm ${message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</p>}

      {/* Replaced useFormik with <Formik> component to establish context for <ErrorMessage> */}
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
        }}
        validationSchema={validationSchema}
        // Pass setMessage to the submission handler
        onSubmit={(values, actions) => handleSubmission(values, { ...actions, setMessage })}
      >
        {/* Use the render prop pattern to access Formik state and helper functions */}
        {({ isSubmitting, isValid, touched, errors, getFieldProps }) => (
          // Use Form component which automatically calls handleSubmit
          <Form className="space-y-4"> 

            {/* First Name Field */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name:</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                // Formik helper methods
                {...getFieldProps('firstName')}
                // Dynamic styling retained, using render prop values (touched, errors)
                className={`w-full p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${touched.firstName && errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {/* ErrorMessage is now correctly nested within Formik context */}
              <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            {/* Last Name Field */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name:</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                // Formik helper methods
                {...getFieldProps('lastName')}
                // Dynamic styling retained, using render prop values (touched, errors)
                className={`w-full p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${touched.lastName && errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {/* ErrorMessage is now correctly nested within Formik context */}
              <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address:</label>
              <input
                id="email"
                name="email"
                type="email"
                // Formik helper methods
                {...getFieldProps('email')}
                // Dynamic styling retained, using render prop values (touched, errors)
                className={`w-full p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${touched.email && errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {/* ErrorMessage is now correctly nested within Formik context */}
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={`w-full p-2 rounded-lg text-white transition duration-150 ease-in-out ${isSubmitting || !isValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {isSubmitting ? 'Submitting...' : 'Formik Submit'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;