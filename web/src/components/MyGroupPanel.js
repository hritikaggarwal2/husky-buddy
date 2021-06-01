// Node Modules
import { useHistory } from "react-router-dom";

// Components
import GroupBox from "./GroupBox";

/**
 * Function that displays the collection of groups of which the
 * current user is a part of. These groups can be clicked and
 * navigated to as needed by the user.
 *
 */
export default function MyGroupPanel(props) {
  const history = useHistory();

  function goToChat(groupInfo) {
    history.push({
      pathname: "/panelview",
      state: { group: groupInfo },
    });
  }

  return (
    <div className="myGroupPanel wrap container d-flex row justify-around align-center">
      {props.groups
        .sort((a, b) => {
          if (a[props.sort].toLowerCase() === b[props.sort].toLowerCase()) {
            return a.id > b.id ? 1 : -1;
          }
          return a[props.sort].toLowerCase() > b[props.sort].toLowerCase()
            ? 1
            : -1;
        })
        .map((group) => (
          <GroupBox
            key={group.id}
            onClick={() => goToChat(group)}
            group={group}
          />
        ))}
    </div>
  );
}
