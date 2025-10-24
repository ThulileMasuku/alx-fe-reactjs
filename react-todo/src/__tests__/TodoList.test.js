import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../TodoList';

// Helper function to find all todo list items
const getTodoListItems = () => screen.queryAllByRole('listitem');

describe('TodoList Component Tests', () => {
  // Test 1: Initial Render and Demo Todos
  test('renders the TodoList component and initial demo todos', () => {
    render(<TodoList />);

    // Check if the main heading is present
    expect(screen.getByText(/My Todo List/i)).toBeInTheDocument();

    // Check if the initial 3 demo todos are rendered
    const listItems = getTodoListItems();
    expect(listItems).toHaveLength(3);
    expect(screen.getByText(/Learn React Testing Library/i)).toBeInTheDocument();
    expect(screen.getByText(/Build a Todo List/i)).toBeInTheDocument();
    expect(screen.getByText(/Write comprehensive tests/i)).toBeInTheDocument();

    // Check if the completed todo has line-through style (implementation specific check)
    const completedTodo = screen.getByText(/Build a Todo List/i);
    expect(completedTodo).toHaveStyle('text-decoration: line-through');
  });

  // Test 2: Adding a New Todo
  test('allows users to add a new todo item', () => {
    render(<TodoList />);
    
    // Find input and button
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    const initialCount = getTodoListItems().length;

    const newTodoText = 'Buy groceries';
    
    // Simulate user typing
    fireEvent.change(input, { target: { value: newTodoText } });
    expect(input.value).toBe(newTodoText);

    // Simulate form submission (clicking the add button)
    fireEvent.click(addButton);

    // Check if the input is cleared
    expect(input.value).toBe('');

    // Check if the new todo is added to the list (count increases)
    const updatedItems = getTodoListItems();
    expect(updatedItems).toHaveLength(initialCount + 1);

    // Check if the new todo text is visible and not completed
    const newTodoItem = screen.getByText(newTodoText);
    expect(newTodoItem).toBeInTheDocument();
    expect(newTodoItem).toHaveStyle('text-decoration: none'); // Should not be line-through initially
  });

  // Test 3: Toggling a Todo
  test('allows a todo item to be toggled between completed and not completed', () => {
    render(<TodoList />);

    // Find the uncompleted todo text
    const todoToToggle = screen.getByText(/Learn React Testing Library/i);
    expect(todoToToggle).toHaveStyle('text-decoration: none'); // Initially uncompleted

    // Simulate clicking the todo text to toggle
    fireEvent.click(todoToToggle);

    // Check if it is now completed (line-through style)
    expect(todoToToggle).toHaveStyle('text-decoration: line-through');

    // Simulate clicking again to toggle back
    fireEvent.click(todoToToggle);

    // Check if it is now uncompleted
    expect(todoToToggle).toHaveStyle('text-decoration: none');
  });

  // Test 4: Deleting a Todo
  test('allows a todo item to be deleted', () => {
    render(<TodoList />);
    
    const initialCount = getTodoListItems().length;
    
    // The initial demo todo we will delete
    const todoTextToDelete = 'Write comprehensive tests';
    expect(screen.getByText(todoTextToDelete)).toBeInTheDocument();
    
    // Find the delete button associated with the third initial todo (id: 3)
    // Note: The specific ID (3) is determined from the initial state in TodoList.js
    const deleteButton = screen.getByTestId('delete-button-3'); 

    // Simulate clicking the delete button
    fireEvent.click(deleteButton);

    // Check if the todo item is removed from the DOM
    expect(screen.queryByText(todoTextToDelete)).not.toBeInTheDocument();

    // Check if the total number of todos has decreased by one
    expect(getTodoListItems()).toHaveLength(initialCount - 1);
  });
  
  // Test 5: Empty State Message
  test('displays a message when the todo list is empty', () => {
    render(<TodoList />);
    
    // Delete all initial items
    const deleteButtons = screen.queryAllByText('Delete');
    
    // Click all delete buttons one by one
    deleteButtons.forEach(button => fireEvent.click(button));

    // Check that the empty state message is now visible
    expect(screen.getByText(/No todos left! 🎉/i)).toBeInTheDocument();
    expect(getTodoListItems()).toHaveLength(0);
  });
});