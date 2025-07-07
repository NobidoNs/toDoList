import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Todo } from '../App';

interface TodoInputProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoInput: React.FC<TodoInputProps> = ({ setTodos }) => {
  const [value, setValue] = useState('');

  const handleAdd = () => {
    if (value.trim()) {
      setTodos(prev => [
        ...prev,
        { id: Date.now(), text: value.trim(), completed: false },
      ]);
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <Box display="flex" mb={2}>
      <TextField
        fullWidth
        label="Новая задача"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        variant="outlined"
        size="small"
      />
      <Button sx={{ ml: 1 }} variant="contained" onClick={handleAdd}>
        Добавить
      </Button>
    </Box>
  );
}; 