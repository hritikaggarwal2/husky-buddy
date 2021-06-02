// Node Modules
import { useHistory } from "react-router-dom";

// Components
import GroupBox from "./GroupBox";

// Firebase
import firebase from "firebase/app";
import "firebase/firestore";
import { useUser } from "../providers/UserProvider";

/**
 * Function that displays the collection of groups of which the
 * current user is a part of. These groups can be clicked and
 * navigated to as needed by the user.
 *
 */
export default function MyGroupPanel(props) {
  const history = useHistory();
  const userId = useUser().user.uwid;

  function goToChat(groupInfo) {
    history.push({
      pathname: "/panelview",
      state: { group: groupInfo },
    });
  }

  function joinGroup(id) {
    console.log("tried to join group: ", id);
    const refGroups = firebase.firestore().collection("Groups");
    const refUsers = firebase.firestore().collection("Users");

    // Add group ID under user
    const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

    refGroups.doc(id).update({
      members: arrayUnion(userId),
    });

    refUsers.doc(userId).update({
      groups: arrayUnion(id),
    });

    alert("Joined Group!!!");
  }

  return (
    <div className="myGroupPanel wrap container d-flex row justify-around align-center">
      {props?.groups
        .sort((a, b) => {
          if (
            a[props.sort]?.toString().toLowerCase() ===
            b[props.sort]?.toString().toLowerCase()
          ) {
            return a.id > b.id ? 1 : -1;
          }
          return a[props.sort]?.toString().toLowerCase() >
            b[props.sort]?.toString().toLowerCase()
            ? 1
            : -1;
        })
        .map((group) => (
          <GroupBox
            key={group.id}
            onClick={
              props.isSearch ? () => joinGroup(group.id) : () => goToChat(group)
            }
            group={group}
          />
        ))}
    </div>
  );
}
