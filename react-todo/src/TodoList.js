import React, { useState } from 'react';

// Initial data for demonstration
const initialTodos = [
  { id: 1, text: 'Learn React Testing Library', completed: false },
  { id: 2, text: 'Build a Todo List', completed: true },
  { id: 3, text: 'Write comprehensive tests', completed: false }, // ID 3 is crucial for the delete test
];

/**
 * TodoList Component
 * Manages the state for adding, toggling, and deleting todo items.
 */
const TodoList = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodoText, setNewTodoText] = useState('');

  // Handles adding a new todo item
  const addTodo = (e) => {
    e.preventDefault();
    const trimmedText = newTodoText.trim();
    if (trimmedText === '') return;

    const newTodo = {
      id: Date.now(), // Simple unique ID
      text: trimmedText,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTodoText('');
  };

  // Handles toggling the completion status
  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Handles deleting a todo item
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-list-container">
      <h1>My Todo List 📝</h1>

      {/* Add Todo Form */}
      <form onSubmit={addTodo} className="add-todo-form">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new todo"
          data-testid="todo-input" // For testing (Test 2)
        />
        <button type="submit" data-testid="add-button">Add</button> {/* For testing (Test 2) */}
      </form>

      {/* Todo List Display */}
      <ul data-testid="todo-list" style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            data-testid={`todo-item-${todo.id}`}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer',
              marginBottom: '8px',
              padding: '5px',
              border: '1px solid #ccc',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Toggle functionality on click (Test 3) */}
            <span onClick={() => toggleTodo(todo.id)} className="todo-text">
              {todo.text}
            </span>
            
            {/* Delete button (Test 4) */}
            <button 
              onClick={() => deleteTodo(todo.id)} 
              data-testid={`delete-button-${todo.id}`} 
              style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Empty State Message (Test 5) */}
      {todos.length === 0 && <p>No todos left! 🎉</p>}
    </div>
  );
};

export default TodoList;