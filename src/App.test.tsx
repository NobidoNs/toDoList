import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// smoke test
it('renders ToDo List title', () => {
  render(<App />);
  expect(screen.getByText(/ToDo List/i)).toBeInTheDocument();
});

describe('ToDo App functionality', () => {
  it('adds a new todo', () => {
    render(<App />);
    const input = screen.getByLabelText(/Новая задача/i);
    const addButton = screen.getByText(/Добавить/i);
    fireEvent.change(input, { target: { value: 'Test task' } });
    fireEvent.click(addButton);
    expect(screen.getByText('Test task')).toBeInTheDocument();
  });

  it('marks todo as completed', () => {
    render(<App />);
    const input = screen.getByLabelText(/Новая задача/i);
    fireEvent.change(input, { target: { value: 'Complete me' } });
    fireEvent.click(screen.getByText(/Добавить/i));
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    // Найти ListItemText по data-testid
    const todoText = screen.getByTestId(/todo-text-/);
    expect(todoText).toHaveStyle({ textDecoration: 'line-through' });
  });

  it('filters active and completed todos', () => {
    render(<App />);
    const input = screen.getByLabelText(/Новая задача/i);
    fireEvent.change(input, { target: { value: 'Active task' } });
    fireEvent.click(screen.getByText(/Добавить/i));
    fireEvent.change(input, { target: { value: 'Done task' } });
    fireEvent.click(screen.getByText(/Добавить/i));
    // mark second as completed
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]);
    // filter active (Tab index 1)
    const tabs = screen.getAllByRole('tab');
    fireEvent.click(tabs[1]);
    expect(screen.getByText('Active task')).toBeInTheDocument();
    expect(screen.queryByText('Done task')).not.toBeInTheDocument();
    // filter completed (Tab index 2)
    fireEvent.click(tabs[2]);
    expect(screen.getByText('Done task')).toBeInTheDocument();
    expect(screen.queryByText('Active task')).not.toBeInTheDocument();
  });

  it('shows correct remaining count', () => {
    render(<App />);
    const input = screen.getByLabelText(/Новая задача/i);
    fireEvent.change(input, { target: { value: 'One' } });
    fireEvent.click(screen.getByText(/Добавить/i));
    fireEvent.change(input, { target: { value: 'Two' } });
    fireEvent.click(screen.getByText(/Добавить/i));
    expect(screen.getByText(/Осталось задач: 2/)).toBeInTheDocument();
    // complete one
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    expect(screen.getByText(/Осталось задач: 1/)).toBeInTheDocument();
  });

  it('clears completed todos', () => {
    render(<App />);
    const input = screen.getByLabelText(/Новая задача/i);
    fireEvent.change(input, { target: { value: 'To be done' } });
    fireEvent.click(screen.getByText(/Добавить/i));
    fireEvent.change(input, { target: { value: 'To be completed' } });
    fireEvent.click(screen.getByText(/Добавить/i));
    // complete one
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]);
    // clear completed
    fireEvent.click(screen.getByText(/Очистить выполненные/i));
    expect(screen.queryByText('To be completed')).not.toBeInTheDocument();
    expect(screen.getByText('To be done')).toBeInTheDocument();
  });
});
