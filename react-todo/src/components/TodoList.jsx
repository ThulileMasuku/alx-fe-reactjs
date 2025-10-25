import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';

// Initial state for demonstration purposes
const initialTodos = [
  { id: 1, text: 'Create the Todo List Component', completed: true },
  { id: 2, text: 'Write the Jest tests', completed: false },
  { id: 3, text: 'Pass all checks', completed: false },
];

function TodoList() {
  const [todos, setTodos] = useState(initialTodos);

  // Function to add a new todo item
  const addTodo = (text) => {
    if (text.trim() === '') return;
    const newTodo = {
      // Use Date.now() for a simple unique ID
      id: Date.now(), 
      text,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // Function to toggle a todo's completion status
  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Function to delete a todo item
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-list-container">
      <h1>My React Todo List</h1>
      
      {/* Component for adding new todos */}
      <AddTodoForm addTodo={addTodo} />
      
      {/* Todo items display */}
      <ul data-testid="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            // Apply a class based on completion status for styling/testing
            className={todo.completed ? 'todo-item completed' : 'todo-item'}
          >
            <span
              className="todo-text"
              onClick={() => toggleTodo(todo.id)}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
              data-testid={`todo-item-${todo.id}`}
            >
              {todo.text}
            </span>
            
            {/* Delete Button */}
            <button 
              className="delete-button"
              onClick={() => deleteTodo(todo.id)}
              data-testid={`delete-btn-${todo.id}`}
              aria-label={`Delete ${todo.text}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && <p>No todos yet! Time to get organized.</p>}
    </div>
  );
}

export default TodoList;