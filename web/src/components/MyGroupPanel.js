import { useState, useEffect } from "react";

import { useUser } from "../providers/UserProvider";

import firebase from "firebase/app";
import "firebase/firestore";

import GroupBox from "./GroupBox";

import { useHistory } from "react-router-dom";

/**
 * Function that displays a side panel with the
 * links to the groups a user is a member of.
 *
 */
export default function MyGroupPanel() {
  const [groups, setGroups] = useState([]);
  const user = useUser().user;

  const history = useHistory();

  // Retrieve the values of the groups
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("Groups")
      .where("members", "array-contains", user.uwid)
      .onSnapshot(
        {
          // Listen for document metadata changes
          includeMetadataChanges: true,
        },
        (snapshot) => {
          let allGroups = [];
          snapshot.docs.forEach((doc) => {
            allGroups.push({ ...doc.data(), id: doc.id });
          });
          setGroups(allGroups);
        }
      );

    return () => {
      unsubscribe();
    };
  }, [user]);

  function goToChat(groupInfo) {
    history.push({
      pathname: "/panelview",
      state: { group: groupInfo },
    });
  }

  return (
    <div className="myGroupPanel container">
      <h2>MY GROUPS</h2>
      <div className="d-flex row justify-center align-center">
        {groups.map((group) => (
          <GroupBox
            key={group.id}
            onClick={() => goToChat(group)}
            group={group}
          />
        ))}
      </div>
    </div>
  );
}
