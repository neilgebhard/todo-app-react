const FilterButton = ({ name, filter, updateList }) => {
  const onClickHandler = () => updateList(name);
  return (
    <button
      type="button"
      className={`btn btn-filter ${filter === name ? "btn-active" : ""}`}
      onClick={onClickHandler}
    >
      {name}
    </button>
  );
};

export default FilterButton;
