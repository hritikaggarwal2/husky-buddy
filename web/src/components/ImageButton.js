export default function GroupBox(props) {
  return (
    <button
      onClick={props.onClick}
      className="imageBtn d-flex justidy-center align-center"
    >
      <img alt={props.alt} src={props.src} />
      {props.text}
    </button>
  );
}
