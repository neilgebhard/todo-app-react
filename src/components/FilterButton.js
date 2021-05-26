export default function FilterButton(props) {
  return (
    <button type="button" className="btn toggle-btn" aria-pressed="true" onClick={() => props.updateList(props.name)}>
      <span className="visually-hidden">Show </span>
      <span>{props.name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}