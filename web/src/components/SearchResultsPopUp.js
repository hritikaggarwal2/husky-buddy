import { useState } from "react";
import PopUpForm from "./PopUpForm";

import firebase from "firebase/app";
import "firebase/firestore";

import { useUser } from "../providers/UserProvider";

import GroupBox from "./GroupBox";

/**
 * Function that displays all groups based
 * on user search preferences. Also allows user to join a group
 * from the list of groups.
 *
 * @param props - Must include:
 *                  - Function to open results
 *                  - Function to close results
 *                  - Array of Group docs containing: id, and data();
 */
export default function SearchResultsPopUp(props) {
  const userId = useUser().user.uwid;

  function joinGroup(groupDoc) {
    console.log("tried to join group: ", groupDoc.id);
    const refGroups = firebase.firestore().collection("Groups");
    const refUsers = firebase.firestore().collection("Users");

    // Add group ID under user
    const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

    refGroups.doc(groupDoc.id)
      .update(
        {
        members: arrayUnion(userId)
        }
      );

    refUsers.doc(userId)
    .update(
      {
      groups: arrayUnion(groupDoc.id)
      }
    );

    alert("Joined Group!!!");
  }

  return (
    <>
      <PopUpForm
        onSubmit={() => props.close()}
        btnText="Close"
        close={() => props.close()}
      >
        <h2>Click on Group to Join</h2>
        <div className="d-flex row justify-center align-center">
          {props.groupsToDisplay.current.map((group) => (
            <GroupBox
              key={group.id}
              onClick={() => joinGroup(group)}
              group={group.data()}
            />
          ))}
        </div>
      </PopUpForm>
    </>
  );
}