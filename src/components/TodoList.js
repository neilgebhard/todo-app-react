import { AnimatePresence } from "framer-motion";

const TodoList = ({ taskList }) => {
  return (
    <div role="list" className="todo-list" aria-labelledby="list-heading">
      <AnimatePresence>{taskList}</AnimatePresence>
    </div>
  );
};

export default TodoList;
