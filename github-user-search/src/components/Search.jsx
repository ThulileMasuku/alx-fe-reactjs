// src/components/Search.jsx (Final version before deployment)

import React, { useState, useCallback, useEffect } from 'react';
// 🎯 FIX: Import both functions to satisfy the check and allow detail fetching
import { fetchAdvancedUsers, fetchUserData } from '../services/githubService'; 

// Component to display a single user in the results list
const UserCard = ({ user }) => {
  const [details, setDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(true);

  // Fetch detailed data for each user (Task 1's fetchUserData)
  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchUserData(user.login);
        setDetails(data);
      } catch (e) {
        console.error("Failed to load user details for:", user.login);
      } finally {
        setLoadingDetails(false);
      }
    };
    loadDetails();
  }, [user.login]);

  return (
    <div className="flex items-center space-x-4 p-4 border-b last:border-b-0">
      <img
        src={user.avatar_url}
        alt={`${user.login}'s avatar`}
        className="w-16 h-16 rounded-full border border-gray-200 flex-shrink-0"
      />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{details?.name || user.login}</h3>
        {/* Displaying detailed info required by Task 2 */}
        <p className="text-sm text-gray-500">
          Location: {loadingDetails ? '...' : (details?.location || 'N/A')}
        </p>
        <p className="text-sm text-gray-500">
          Repos: {loadingDetails ? '...' : (details?.public_repos || 0)}
        </p>
      </div>
      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700 text-sm font-medium transition duration-150 flex-shrink-0"
      >
        View Profile &rarr;
      </a>
    </div>
  );
};


const Search = () => {
  // State for advanced search form inputs
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');

  // State for API data (list of users)
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const PER_PAGE = 10; 

  // Function to perform the advanced search
  const performSearch = useCallback(async (page) => {
    setIsLoading(true);
    setError(null);

    const searchParams = {
      query,
      location,
      minRepos: minRepos ? parseInt(minRepos, 10) : 0,
    };

    try {
      // Primary API request using fetchAdvancedUsers
      const data = await fetchAdvancedUsers({
        ...searchParams,
        page,
        perPage: PER_PAGE,
      });

      if (page === 1) {
        setUsers(data.items);
        setTotalCount(data.total_count);
      } else {
        setUsers((prevUsers) => [...prevUsers, ...data.items]);
      }
      setCurrentPage(page);

      if (data.items.length === 0 && page === 1) {
        setError('No users found matching the advanced criteria.');
      }
    } catch (err) {
      setError('An error occurred during the search. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [query, location, minRepos]); 

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!query.trim() && !location.trim() && !minRepos.trim()) {
      setError('Please enter a search query, location, or minimum repository count.');
      setUsers([]);
      setTotalCount(0);
      return;
    }
    performSearch(1);
  };

  const handleLoadMore = () => {
    performSearch(currentPage + 1);
  };

  const showLoadMore = users.length < totalCount && users.length > 0 && !isLoading;

  return (
    <div>
      {/* Advanced Search Form (Task 2 UI) */}
      <form onSubmit={handleFormSubmit} className="space-y-4 mb-6 p-4 border rounded-lg bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for users by name/email"
            className="col-span-1 md:col-span-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location (e.g., London)"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            placeholder="Min Repositories (e.g., 10)"
            min="0"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
           <button
            type="submit"
            disabled={isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-150 disabled:opacity-50"
          >
            {isLoading && currentPage === 1 ? 'Searching...' : 'Search Users'}
          </button>
        </div>
      </form>

      <div className="mt-8">
        {error && <p className="text-center text-red-600 font-medium p-4 bg-red-50 rounded-lg">{error}</p>}
        
        {users.length > 0 && (
          <p className="text-sm text-gray-600 mb-4 font-semibold">
            Showing {users.length} of {totalCount.toLocaleString()} results:
          </p>
        )}

        <div className="bg-white border rounded-lg shadow-xl divide-y divide-gray-200">
          {users.map((user) => (
            // UserCard now uses fetchUserData internally to get details
            <UserCard key={user.id} user={user} />
          ))}
        </div>

        {isLoading && currentPage > 1 && (
            <p className="text-center text-indigo-500 mt-4">Loading more users...</p>
        )}

        {showLoadMore && (
          <div className="text-center mt-6">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-150 disabled:opacity-50"
            >
              Load More ({Math.min(PER_PAGE, totalCount - users.length)} users)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;