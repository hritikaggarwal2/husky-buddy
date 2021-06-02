import { useState, useEffect } from "react";

import { useUser } from "../providers/UserProvider";

import firebase from "firebase/app";
import "firebase/firestore";

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
          console.log("firebase call");
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
    <div className="sidepanel container">
      <h2 className="d-flex column justify-center align-center">MY GROUPS</h2>
      <div className="groupWrap column justify-center align-center">
        {groups.map((group) => (
          <div className="listItem" onClick={() => goToChat(group)}>
            <h3>{group.group_name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
