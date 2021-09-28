import { useRef } from "react";
import { motion } from "framer-motion";
import TrashIcon from "../assets/TrashIcon";

const Todo = (props) => {
  const inputRef = useRef();

  const onKeyPressHandler = (e) => {
    if (e.which === 13) {
      inputRef.current.blur();
    }
  };

  const toggleCompleteHandler = (id, completed) => {
    const updatedTasks = props.tasks.map((task) => {
      if (id === task.id) {
        props.editTaskCompleted(id, !task.completed);
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    props.setTasks(updatedTasks);
  };

  const onChangeHandler = (id, name) => {
    const updatedTasks = props.tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name };
      }
      return task;
    });
    props.setTasks(updatedTasks);
  };

  const onBlurHandler = (id, name) => {
    props.editTaskName(id, name);
  };

  return (
    <motion.li
      className="todo-item"
      initial={{ x: "100vw", transition: { type: "spring", duration: 2 } }}
      animate={{ x: 0, transition: { type: "spring", duration: 2 } }}
      exit={{
        x: "-70vw",
        transition: { duration: 1 },
      }}
    >
      <input
        id={props.id}
        type="checkbox"
        className="checkbox"
        checked={props.completed}
        onChange={() => toggleCompleteHandler(props.id, props.completed)}
      />
      <input
        type="text"
        value={props.name}
        className={`input-todo ${props.completed ? "todo-completed" : ""}`}
        ref={inputRef}
        onChange={(e) => onChangeHandler(props.id, e.target.value)}
        onKeyPress={onKeyPressHandler}
        onBlur={(e) => onBlurHandler(props.id, e.target.value)}
      />
      <button
        type="button"
        className="btn btn-delete"
        onClick={() => props.deleteTask(props.id)}
      >
        <TrashIcon width="2rem" strokeColor="#d63031" />
      </button>
    </motion.li>
  );
};

export default Todo;
