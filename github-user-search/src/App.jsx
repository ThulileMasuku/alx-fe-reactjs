// src/App.jsx
import './index.css';
import Search from './components/Search';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        GitHub User Search Application
      </h1>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        {/* The Search component handles the core functionality for both basic and advanced search */}
        <Search />
      </div>
    </div>
  );
}

export default App;