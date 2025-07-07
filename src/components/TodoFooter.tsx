import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Todo } from '../App';

interface TodoFooterProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoFooter: React.FC<TodoFooterProps> = ({ todos, setTodos }) => {
  const remaining = todos.filter(t => !t.completed).length;
  const handleClear = () => setTodos(prev => prev.filter(t => !t.completed));

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
      <Typography variant="body1">
        Осталось задач: {remaining}
      </Typography>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleClear}
        disabled={todos.every(t => !t.completed)}
      >
        Очистить выполненные
      </Button>
    </Box>
  );
}; 