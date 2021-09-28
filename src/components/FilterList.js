import FilterButton from "./FilterButton";

const FilterList = ({ setFilter, filter }) => {
  const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
  };

  const FILTER_NAMES = Object.keys(FILTER_MAP);

  const updateList = (name) => {
    setFilter(name);
  };

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      name={name}
      key={name}
      updateList={updateList}
      filter={filter}
    />
  ));

  return <div className="btn-filter-group">{filterList}</div>;
};

export default FilterList;
