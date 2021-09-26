export default function TodoList(props) {
	return (
		<div role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
			{props.taskList}
		</div>
	);
}