import React, { useState } from 'react';

function AddTodoForm({ addTodo }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the trimmed value to the addTodo function
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
        addTodo(trimmedValue);
        setInputValue(''); // Clear input after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="add-todo-form">
      <input
        type="text"
        placeholder="Add a new task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        aria-label="New todo text input"
        data-testid="todo-input"
      />
      <button type="submit" data-testid="add-button">
        Add
      </button>
    </form>
  );
}

export default AddTodoForm;