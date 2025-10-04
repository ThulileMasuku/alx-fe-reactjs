import Counter from './components/Counter';

function App() {
  return (
    <Counter />
  );
}
import React from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';

const App = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>🍽 Recipe Sharing App</h1>
      <SearchBar />
      <RecipeList />
    </div>
  );
};
f5c2d51 (Added advanced search and filtering with Zustand)

export default App;
