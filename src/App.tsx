import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.5s',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          boxShadow: 6,
          borderRadius: 5,
          bgcolor: 'rgba(255,255,255,0.95)',
          p: { xs: 2, sm: 4 },
          my: 6,
          minWidth: { xs: '90vw', sm: 400 },
          transition: 'box-shadow 0.3s',
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          fontWeight={800}
          sx={{
            background: 'linear-gradient(90deg,rgb(0, 98, 255) 0%,rgb(0, 174, 255) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 3,
          }}
        >
          ToDo List
        </Typography>
        <TodoInput setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} />
        <TodoFooter todos={todos} setTodos={setTodos} />
      </Container>
    </Box>
  );
}

export default App;
