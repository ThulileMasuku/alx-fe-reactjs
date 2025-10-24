import React, { useState } from 'react';

// Initial data for demonstration
const initialTodos = [
  { id: 1, text: 'Learn React Testing Library', completed: false },
  { id: 2, text: 'Build a Todo List', completed: true },
  { id: 3, text: 'Write comprehensive tests', completed: false },
];

/**
 * Todo List component: Manages the state of todos (add, toggle, delete).
 */
const TodoList = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodoText, setNewTodoText] = useState('');

  // Function to add a new todo item
  const addTodo = (e) => {
    e.preventDefault();
    if (newTodoText.trim() === '') return;

    const newTodo = {
      id: Date.now(), // Simple unique ID
      text: newTodoText,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setNewTodoText('');
  };

  // Function to toggle the completion status of a todo
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Function to delete a todo item
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
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
          data-testid="todo-input" // For testing
        />
        <button type="submit" data-testid="add-button">Add</button>
      </form>

      {/* Todo List Display */}
      <ul data-testid="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            data-testid={`todo-item-${todo.id}`} // For testing individual items
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
            {/* Toggle functionality on click */}
            <span onClick={() => toggleTodo(todo.id)} className="todo-text">
              {todo.text}
            </span>
            
            {/* Delete button */}
            <button 
              onClick={() => deleteTodo(todo.id)} 
              data-testid={`delete-button-${todo.id}`} // For testing
              style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {todos.length === 0 && <p>No todos left! 🎉</p>}
    </div>
  );
};

export default TodoList;