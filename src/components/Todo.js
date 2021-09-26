export default function Todo(props) {

  const toggleComplete = id => {
    const updatedTasks = props.tasks.map(task => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    props.setTasks(updatedTasks);
  }

  const editTask = id => {
    const name = prompt('What would you like to rename the task to?');
    const updatedTasks = props.tasks.map(task => {
      if (id === task.id) {
        return { ...task, name };
      }
      return task;
    });
    props.setTasks(updatedTasks);
  }

  return (
    <li className="todo stack-small">
      <div className="c-cb">
          <input id={props.id} type="checkbox" checked={props.completed} onChange={() => toggleComplete(props.id)} />
          <label className="todo-label" htmlFor={props.id}>
              {props.name}
          </label>
      </div>
      <div className="btn-group">
          <button type="button" className="btn" onClick={() => editTask(props.id)}>
              Edit <span className="visually-hidden">{props.name}</span>
          </button>
          <button type="button" className="btn btn__danger" onClick={() => props.deleteTask(props.id)}>
              Delete <span className="visually-hidden">{props.name}</span>
          </button>
      </div>
    </li>
  );
}