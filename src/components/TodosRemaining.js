const TodosRemaining = ({ taskListLength }) => {
  return (
    <div className="todos-remaining">
      {taskListLength} task{`${taskListLength !== 1 ? "s" : ""}`} remaining
    </div>
  );
};

export default TodosRemaining;
