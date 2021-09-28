import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";
import TodosRemaining from "./components/TodosRemaining";
import FilterList from "./components/FilterList";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { API } from "aws-amplify";
import { listTodos } from "./graphql/queries";
import { createTodo, updateTodo, deleteTodo } from "./graphql/mutations";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { motion } from "framer-motion";
import "./App.css";

function App() {
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
      let newTask = { name: name, completed: false };
      newTask = await API.graphql({
        query: createTodo,
        variables: { input: newTask },
      });
      setTasks([...tasks, newTask.data.createTodo]);
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    API.graphql({ query: deleteTodo, variables: { input: { id } } });
  };

  const editTaskName = (id, name) => {
    API.graphql({
      query: updateTodo,
      variables: { input: { id, name } },
    });
  };

  const editTaskCompleted = (id, completed) => {
    API.graphql({
      query: updateTodo,
      variables: { input: { id, completed } },
    });
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
        editTaskName={editTaskName}
        editTaskCompleted={editTaskCompleted}
        setTasks={setTasks}
      />
    ));

  return (
    <div className="container">
      <div className="btn-signout-wrapper">
        <AmplifySignOut />
      </div>
      <motion.div
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <TodoInput setName={setName} addTask={addTask} name={name} />
        <FilterList setFilter={setFilter} filter={filter} />
        <TodoList taskList={taskList} />
        <TodosRemaining taskListLength={taskList.length} />
      </motion.div>
    </div>
  );
}

export default withAuthenticator(App);
