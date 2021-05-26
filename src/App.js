import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Todo from './components/Todo';
import ListHeading from './components/ListHeading';
import FilterList from './components/FilterList';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './App.css';

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');
  const [name, setName] = useState('');

  function addTask(name) {
    const newTask = { id: nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  }

  const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => <Todo 
      name={task.name} 
      completed={task.completed} 
      id={task.id} 
      key={task.id} 
      tasks={tasks}
      deleteTask={deleteTask} 
      setTasks={setTasks}
    />);

  return (
    <div className="todoapp stack-large">
      <h1>Todo App</h1>
      <TodoInput setName={setName} addTask={addTask} name={name} />
      <FilterList setFilter={setFilter} />
      <ListHeading taskList={taskList} />
      <TodoList taskList={taskList} />
      
    </div>
  );
}

export default App;