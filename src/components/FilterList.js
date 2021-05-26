import FilterButton from './FilterButton';

export default function FilterList(props) {

  const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
  }

  const FILTER_NAMES = Object.keys(FILTER_MAP);

  function updateList(name) {
    props.setFilter(name);
  }

	const filterList = FILTER_NAMES.map(name => <FilterButton name={name} key={name} updateList={updateList} />);

	return (
		<div className="filters btn-group stack-exception">
			{filterList}
		</div>
	);
}
