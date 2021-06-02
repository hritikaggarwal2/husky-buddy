import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/common.scss";

/**
 * Component that provides a dropdown option that
 * Slides out from the right side of the screen.
 * Which further has buttons such as deleting a group.
 *
 * @param props -Must include:
 *                      - firebase: object to call to delete a group from database
 *                      - user: userCurrently logged in
 *                      - groupID: the group the person is accessing at the moment
 */
export default function Slideout(props) {
  const [openDropdown, setOpenDropdown] = useState(false);

  // Removes member from the group and realocates a new group owner
  // if no members are left upon removal, deletes group from database
  // TODO: Remove the Chat document associated with the group
  function removeGroup() {
    const refGroups = props.firebase.firestore().collection("Groups");
    const refUsers = props.firebase.firestore().collection("Users");
    // const refChat = props.firebase.firestore().collection("Chats");
    // const refInnerChat = props.firebase
    //   .firestore()
    //   .collection(`Chats/${props.groupID.id}/chat`);
    const arrayRemove = props.firebase.firestore.FieldValue.arrayRemove;
    //const refFiles = props.firebase.storage().reference().child(`/${props.user.uwid}`);

    refGroups.doc(props.groupID.id).onSnapshot((snapshot) => {
      let members = snapshot.get("members");
      // Delete Group if no members remain
      if (members === undefined || members.length === 1) {
        refGroups.doc(props.groupID.id).delete();
      } else {
        let newOwner = members[0];
        refGroups
          .doc(props.groupID.id)
          .update({
            members: arrayRemove(props.user.uwid),
            owner: newOwner,
          })
          .then(() => {
            refUsers.doc(props.user.uwid).update({
              groups: arrayRemove(props.groupID.id),
            });
            console.log("firebase call");
          });
      }
    });
  }

  function dropdownClick(e) {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    const open = openDropdown;
    setOpenDropdown(!open);
  }

  return (
    <div className="dropdown" onClick={dropdownClick}>
      <div className="dropdownLine"></div>
      <div className="dropdownLine"></div>
      <div className="dropdownLine"></div>
      {openDropdown ? (
        <div id="sideNavigation" className="sidenav">
          <a href="#delete" className="closebtn" onclick={dropdownClick}>
            &times;
          </a>
          <Link to="/dashboard" className="sidenavBtn" onClick={removeGroup}>
            Delete Group
          </Link>
        </div>
      ) : null}
    </div>
  );
}
