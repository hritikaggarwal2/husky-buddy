import React, { useState, useEffect } from "react";
import "../styles/common.scss";
import { GroupClassConverter } from "../data/GroupClass";
import { useUser } from "../providers/UserProvider";
import firebase from "firebase/app";
import "firebase/firestore";
import PanelView from "../screens/PanelView";

/**
 * Function that displays a side panel with the
 * links to the groups a user is a member of.
 *
 */
export default function MyGroupPanel() {
  const [groups, setGroups] = useState([]);
  const huskyUserId = useUser().firebaseUser.uid;

  // Retrieve the values of the groups
  useEffect(() => {
    const refUsers = firebase.firestore().collection("Users");
    const refGroups = firebase.firestore().collection("Groups");

    refUsers
      .doc(huskyUserId)
      .get()
      .then((snapshot) => {
        //console.log(snapshot.data());
        let groupIds = snapshot.get("groups");
        //refGroups
        //  .where("doc", "in", groupIds)
        //  .get()
        //  .then((snapshot) => {
        //    console.log("group snapshot data: ");
        //    console.log(snapshot.data);
        //    //setGroups(snapshot.data());
        //  });

        groupIds.forEach((groupId) => {
          //console.log(doc.id, " => ", doc.data());
          refGroups
            .doc(groupId)
            .withConverter(GroupClassConverter)
            .get()
            .then((snapshot) => {
              // XXX: this is not a good solution
              //groups.push(snapshot.data());
              console.log("got group:");
              console.log(snapshot.data());
              setGroups((groups) => [...groups, snapshot.data()]);
            });
        });
      });
  }, []);

  // Display all values of a group
  let displayList = [];
  for (let i = 0; i < groups.length; i++) {
    // TODO: FIX "/panelview" to actually point to a group's chat
    displayList.push(
      <li>
        <a href={"/panelview"}>{groups[i].group_name}</a>
      </li>
    );
  }

  return (
    <div className="myGroupPanel">
      MY GROUPS
      {displayList}
    </div>
  );
}
