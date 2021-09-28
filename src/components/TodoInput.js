const TodoInput = ({ addTask, setName, name }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(name);
    setName("");
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <form className="form-todo" onSubmit={handleSubmit}>
      <input
        type="text"
        id="input-new-todo"
        className="input-new-todo"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
        placeholder="Add new task"
      />
      <button type="submit" className="btn btn-primary btn-add">
        +
      </button>
    </form>
  );
};

export default TodoInput;
