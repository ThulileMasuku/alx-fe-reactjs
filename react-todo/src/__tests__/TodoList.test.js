import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for useful matchers like toBeInTheDocument
import TodoList from '../TodoList';

// Helper function to get all current todos rendered by text content
const getTodoTexts = () => screen.queryAllByRole('listitem').map(li => li.querySelector('.todo-text').textContent);

describe('TodoList Component', () => {
  // Test 1: Initial Render
  test('renders the TodoList component and initial todos', () => {
    render(<TodoList />);
    
    // Check if the main heading is rendered
    expect(screen.getByText('Todo List')).toBeInTheDocument();

    // Check if the initial todos are rendered
    expect(screen.getByText('Learn React Testing Library')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo List')).toBeInTheDocument();
    expect(screen.getByText('Write comprehensive tests')).toBeInTheDocument();
    
    // Check for the number of list items (initial 3)
    expect(screen.queryAllByRole('listitem')).toHaveLength(3);
  });
// ----------------------------------------------------------------------
  // Test 2: Adding Todos
  test('allows a user to add a new todo item', () => {
    render(<TodoList />);

    const newTodoText = 'Walk the dog';
    
    // 1. Find the input field and button
    const inputElement = screen.getByLabelText('New todo text');
    const addButton = screen.getByRole('button', { name: /add todo/i });
    
    // 2. Simulate user input
    fireEvent.change(inputElement, { target: { value: newTodoText } });
    
    // Check that the input value is updated
    expect(inputElement.value).toBe(newTodoText);

    // 3. Simulate form submission (clicking the button)
    fireEvent.click(addButton);

    // 4. Verify the new todo is in the document
    expect(screen.getByText(newTodoText)).toBeInTheDocument();
    
    // 5. Verify the total number of todos increased (initial 3 + 1 new = 4)
    expect(screen.queryAllByRole('listitem')).toHaveLength(4);

    // 6. Verify the input field is cleared after submission
    expect(inputElement.value).toBe('');
  });
// ----------------------------------------------------------------------
  // Test 3: Toggling Todos
  test('allows a user to toggle a todo item status', () => {
    render(<TodoList />);

    const todoText = 'Learn React Testing Library';
    const todoElement = screen.getByText(todoText);

    // Initial check: The item should NOT have the 'line-through' style (not completed)
    expect(todoElement).not.toHaveStyle('text-decoration: line-through');

    // 1. Simulate clicking the todo text to toggle completion
    fireEvent.click(todoElement);

    // 2. Verify the style has changed (it should now be completed)
    expect(todoElement).toHaveStyle('text-decoration: line-through');

    // 3. Simulate clicking again to toggle it back
    fireEvent.click(todoElement);

    // 4. Verify the style is back to normal (not completed)
    expect(todoElement).not.toHaveStyle('text-decoration: line-through');
  });
// ----------------------------------------------------------------------
  // Test 4: Deleting Todos
  test('allows a user to delete a todo item', () => {
    render(<TodoList />);

    const todoToDeleteText = 'Write comprehensive tests';
    
    // 1. Verify the todo is initially present
    expect(screen.getByText(todoToDeleteText)).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(3);
    
    // 2. Find the delete button associated with the todo item
    // We use the aria-label we added for better selection
    const deleteButton = screen.getByRole('button', { name: `Delete ${todoToDeleteText}` });
    
    // 3. Simulate clicking the delete button
    fireEvent.click(deleteButton);

    // 4. Verify the todo is no longer in the document
    expect(screen.queryByText(todoToDeleteText)).not.toBeInTheDocument();

    // 5. Verify the total number of todos decreased (3 - 1 = 2)
    expect(screen.queryAllByRole('listitem')).toHaveLength(2);
  });
});