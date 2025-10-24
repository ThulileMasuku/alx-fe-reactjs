import React from 'react';
// 1. Import the TodoList component
import TodoList from './TodoList'; 

function App() {
  return (
    <div className="App" style={{ padding: '20px' }}>
      {/* 2. Render the TodoList component */}
      <TodoList />
    </div>
  );
}

export default App;