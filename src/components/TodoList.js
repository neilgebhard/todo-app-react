export default function TodoList(props) {
	return (
		<ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
      {props.taskList}
    </ul>
	);
}