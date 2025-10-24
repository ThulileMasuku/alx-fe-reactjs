import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
// Removed: import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// Removed: import './App.css'; 

// --- 1. Data Fetching Function ---
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    // Mimic API failure for demonstration if needed
    throw new Error('Failed to fetch posts from JSONPlaceholder');
  }
  // Simulate a network delay to better see loading/caching states
  await new Promise(resolve => setTimeout(resolve, 800)); 
  return response.json();
};

// --- 2. PostsComponent Logic (Now inline) ---
const PostsContent = () => {
  // Use the useQuery hook
  const { 
    data: posts, 
    isLoading, 
    isError, 
    error, 
    isFetching,
    refetch,
    // isPreviousData flag can be used with keepPreviousData to handle loading states smoothly.
    isPreviousData, 
  } = useQuery({
    queryKey: ['posts'],    // Unique key for caching
    queryFn: fetchPosts,    // The async function to fetch data
    
    // Demonstrating the requested advanced options:
    staleTime: 1000 * 10,   // Data is considered fresh for 10 seconds.
    
    // 1. cacheTime (now gcTime): Data is garbage collected 30 seconds after the component unmounts.
    gcTime: 1000 * 30, 

    // 2. refetchOnWindowFocus: Explicitly disabled to stop automatic refetches when window regains focus.
    refetchOnWindowFocus: false, 

    // 3. keepPreviousData: When refetching, the old data is kept visible until the new data arrives, 
    // preventing the UI from flickering to a loading state. (Requires checking isPreviousData, which is synonymous 
    // with keepPreviousData being true, but the primary logic here is on isFetching).
    keepPreviousData: true,
  });

  const buttonStyle = { 
    padding: '10px 15px', 
    marginRight: '15px', 
    backgroundColor: '#3b82f6', 
    color: 'white', 
    border: 'none', 
    borderRadius: '8px', 
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  if (isLoading) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '8px', textAlign: 'center' }}>
        <h2 style={{ color: '#1f2937' }}>Loading posts...</h2>
        <p>First fetch in progress...</p>
      </div>
    );
  }

  if (isError) {
    return <h2 style={{ color: '#ef4444', padding: '20px', border: '1px solid #fca5a5', borderRadius: '8px' }}>Error: {error.message}</h2>;
  }
  
  // Use isPreviousData status to visually indicate that old data is being displayed during a background fetch
  const dataStatus = isFetching 
    ? (isPreviousData ? 'Displaying old data while updating...' : 'Background Updating...')
    : 'Data is ready and cached.';

  return (
    <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ marginBottom: '15px', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px', color: '#10b981' }}>
        🚀 Posts List ({posts.length} loaded)
      </h2>
      
      {/* Implement Refetch Button */}
      <button 
        onClick={() => refetch()} 
        disabled={isFetching}
        style={{ ...buttonStyle, opacity: isFetching ? 0.6 : 1 }}
      >
        {isFetching ? 'Refetching...' : 'Manually Refetch Data'}
      </button>

      {/* Status Indicator */}
      <span style={{ marginLeft: '15px', color: isFetching ? '#f97316' : '#10b981', fontWeight: 'bold' }}>
        {dataStatus}
      </span>

      <div style={{ marginTop: '20px', maxHeight: '400px', overflowY: 'auto' }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {posts.map((post) => (
            <li 
              key={post.id} 
              style={{ 
                border: '1px solid #d1d5db', 
                padding: '12px', 
                margin: '8px 0', 
                borderRadius: '8px',
                backgroundColor: '#f9fafb',
              }}
            >
              <strong style={{ color: '#1f2937' }}>{post.id}. {post.title}</strong>
              <p style={{ margin: '5px 0 0 0', fontSize: '0.9em', color: '#6b7280' }}>{post.body.substring(0, 70)}...</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


// --- 3. App Component (Provider Setup) ---

// Instantiate the QueryClient outside the component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // We removed the staleTime default here as it's now explicitly set in useQuery
    },
  },
});

function App() {
  const [showPosts, setShowPosts] = useState(true);

  const toggleButtonStyle = { 
    padding: '12px 20px', 
    marginBottom: '20px', 
    backgroundColor: showPosts ? '#dc2626' : '#22c55e', 
    color: 'white', 
    fontWeight: 'bold',
    border: 'none', 
    borderRadius: '10px', 
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'background-color 0.2s',
  };

  return (
    // Wrap the entire application logic with the QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: '30px', fontFamily: 'Inter, Arial, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
        <h1 style={{ color: '#1e3a8a', marginBottom: '25px', borderBottom: '3px solid #bfdbfe', paddingBottom: '10px' }}>
          Advanced Data Handling (TanStack Query)
        </h1>

        <button 
          onClick={() => setShowPosts(!showPosts)}
          style={toggleButtonStyle}
        >
          {showPosts ? 'Unmount/Hide Posts Component' : 'Mount/Show Posts Component (Simulate Navigation)'}
        </button>

        <p style={{ backgroundColor: '#fffbe3', padding: '15px', borderRadius: '8px', borderLeft: '5px solid #fcd34d', color: '#78350f' }}>
          **Caching Demo:** Click the toggle button. Data will be garbage collected after 30 seconds of being unmounted (`gcTime`). We also set `refetchOnWindowFocus` to **false** and use `keepPreviousData` to ensure smooth manual refetches.
        </p>

        <hr style={{ margin: '30px 0', borderColor: '#e5e7eb' }} />

        {/* Conditionally render the PostsContent component */}
        {showPosts ? <PostsContent /> : <h2 style={{ color: '#4b5563', textAlign: 'center', marginTop: '50px' }}>Posts Content is unmounted. Data is safely stored in the Query Cache.</h2>}
      </div>
    </QueryClientProvider>
  );
}

export default App;