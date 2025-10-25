import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';
import './TodoList.css'; // Assuming you might have some basic CSS

// Initial state for demonstration
const initialTodos = [
  { id: 1, text: 'Learn React Testing Library', completed: false },
  { id: 2, text: 'Build a Todo List', completed: true },
  { id: 3, text: 'Write comprehensive tests', completed: false },
];

function TodoList() {
  const [todos, setTodos] = useState(initialTodos);

  // Function to add a new todo
  const addTodo = (text) => {
    if (text.trim() === '') return;
    const newTodo = {
      id: Date.now(), // Simple unique ID
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  // Function to toggle a todo's completion status
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-list-container">
      <h1>Todo List</h1>
      <AddTodoForm addTodo={addTodo} />
      
      {todos.length === 0 ? (
        <p>No todos yet! Add one above.</p>
      ) : (
        <ul className="todo-items-list">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <span
                className="todo-text"
                onClick={() => toggleTodo(todo.id)}
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  cursor: 'pointer',
                }}
              >
                {todo.text}
              </span>
              <button 
                className="delete-button"
                onClick={() => deleteTodo(todo.id)}
                aria-label={`Delete ${todo.text}`} // Good practice for accessibility
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;