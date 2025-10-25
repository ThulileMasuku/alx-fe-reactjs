import React, { useState } from 'react';

function AddTodoForm({ addTodo }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(inputValue.trim());
    setInputValue(''); // Clear input after submission
  };

  return (
    <form onSubmit={handleSubmit} data-testid="add-todo-form">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        aria-label="New todo text"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default AddTodoForm;