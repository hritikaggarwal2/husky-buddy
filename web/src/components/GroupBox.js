// Add Imports
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
      <p className="w500 ls1 bigger primaryText">
        {props.group.class_prefix} {props.group.class_num}
        {props.group.class_section}
      </p>
      <h4>{props.group.group_name}</h4>
      <p>Spring 2021</p>
    </div>
  );
}
