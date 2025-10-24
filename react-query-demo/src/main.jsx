// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Optional: React Query Devtools for inspection
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Configure initial cache time to 5 minutes (default)
      staleTime: 1000 * 60 * 5, 
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {/* Devtools for inspection, only shows up in development */}
      <ReactQueryDevtools initialIsOpen={false} /> 
    </QueryClientProvider>
  </React.StrictMode>,
);