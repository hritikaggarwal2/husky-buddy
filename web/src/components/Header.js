// Node Modules
import { useRef } from "react";
import { Link } from "react-router-dom";

// Image Imports
import Notification from "../assets/notification.png";
import Delete from "../assets/delete.png";
import Search from "../assets/search.png";

// Firebase
import firebase from "firebase/app";
import "firebase/firestore";
import { useUser } from "../providers/UserProvider";

export default function Header(props) {
  const inputRef = useRef();
  const user = useUser().user;

  function onChange(e) {
    props.set(e.target.value);
  }

  function focus(e) {
    inputRef.current.focus();
  }

  function removeGroup() {
    const refGroups = firebase.firestore().collection("Groups");
    const refUsers = firebase.firestore().collection("Users");
    const arrayRemove = firebase.firestore.FieldValue.arrayRemove;

    refGroups.doc(props.chat.current).onSnapshot(
      {
        // Listen for document metadata changes
        includeMetadataChanges: false,
      },
      (snapshot) => {
        let members = snapshot.get("members");
        // Delete Group if no members remain
        if (members === undefined || members.length === 1) {
          refGroups.doc(props.chat.current).delete();
        } else {
          let newOwner = members[0];
          refGroups
            .doc(props.chat.current)
            .update({
              members: arrayRemove(user.uwid),
              owner: newOwner,
            })
            .then(() => {
              refUsers.doc(user.uwid).update({
                groups: arrayRemove(props.chat.current),
              });
            });
        }
        props.chat.setCurrent("");
        console.log("firebase call");
      }
    );
  }

  return (
    <div className="header d-flex row justify-between align-center">
      <div
        className="search flex-grow d-flex align-center justify-center"
        onClick={focus}
      >
        <img alt="Search Icon" src={Search} />
        <input
          ref={inputRef}
          className="flex-grow"
          value={props.input}
          onChange={onChange}
          type="search"
          placeholder={props.text}
        />
      </div>

      <div className="d-flex row align-center">
        {props.chat.isChat ? (
          <div className="tooltip" onClick={removeGroup}>
            {/* XXX hritik : CHANGE IMAGE */}
            <img alt="Delete Group" src={Delete} />
            <span>Delete Group</span>
          </div>
        ) : (
          <Link to="/notifications">
            <div className="tooltip">
              {/* XXX hritik : CHANGE IMAGE */}
              <img alt="Notifications" src={Notification} />
              <span>Notifications</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
