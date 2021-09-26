import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";
import ListHeading from "./components/ListHeading";
import FilterList from "./components/FilterList";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { API } from "aws-amplify";
import { listTodos } from "./graphql/queries";
import { createTodo, deleteTodo } from "./graphql/mutations";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import "./App.css";

function App(props) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [name, setName] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const apiData = await API.graphql({ query: listTodos });
    setTasks(apiData.data.listTodos.items);
  }

  const addTask = async (name) => {
    if (name) {
      const newTask = { name: name, completed: false };
      await API.graphql({ query: createTodo, variables: { input: newTask } });
      setTasks([...tasks, newTask]);
    }
  };

  const deleteTask = async (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    await API.graphql({ query: deleteTodo, variables: { input: { id } } });
  };

  const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
  };

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        name={task.name}
        completed={task.completed}
        id={task.id}
        key={task.id}
        tasks={tasks}
        deleteTask={deleteTask}
        setTasks={setTasks}
      />
    ));

  return (
    <div>
      <AmplifySignOut />
      <div className="todoapp">
        <h1>Todo App</h1>
        <TodoInput setName={setName} addTask={addTask} name={name} />
        <FilterList setFilter={setFilter} />
        <ListHeading taskList={taskList} />
        <TodoList taskList={taskList} />
      </div>
    </div>
  );
}

export default withAuthenticator(App);
