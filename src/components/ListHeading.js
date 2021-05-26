export default function ListHeading(props) {
	return (
		<h2 id="list-heading">
		  {props.taskList.length} tasks remaining
		</h2>
	);
}
