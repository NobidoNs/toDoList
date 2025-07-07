import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Todo } from '../App';

interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

type Filter = 'all' | 'active' | 'completed';

export const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
  const [filter, setFilter] = useState<Filter>('all');

  const handleToggle = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos =
    filter === 'all'
      ? todos
      : filter === 'active'
      ? todos.filter(t => !t.completed)
      : todos.filter(t => t.completed);

  return (
    <>
      <Tabs
        value={filter}
        onChange={(_, v) => setFilter(v)}
        centered
        sx={{ mb: 2 }}
      >
        <Tab label="Все" value="all" />
        <Tab label="Невыполненные" value="active" />
        <Tab label="Выполненные" value="completed" />
      </Tabs>
      <List>
        {filteredTodos.map(todo => (
          <ListItem
            key={todo.id}
            secondaryAction={
              <Checkbox
                edge="end"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
              />
            }
            disablePadding
          >
            <ListItemText
              primary={todo.text}
              sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              data-testid={`todo-text-${todo.id}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}; 