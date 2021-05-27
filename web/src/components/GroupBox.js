// Add Imports
import "../styles/common.scss";
import "../components/MyGroupPanel";

/**
 * 
 * @param props must include:
 *                      - function when user clicks on box
 *                      - group object which includes group's info
 */
export default function GroupBox(props) {
  return (
    <div className="groupBox" onClick={props.onClick}>
      <h3>{props.group.group_name}</h3>
      <p>
        {props.group.class_prefix} {props.group.class_num}
        {props.group.class_section}
      </p>
    </div>
  );
}
