import { useState } from "react";
import PopUpForm from "../components/PopUpForm";
import ValueInputer from "../components/ValueInputer";

import firebase from "firebase/app";
import "firebase/firestore";

import { useUser } from "../providers/UserProvider";

import { GroupClass, GroupClassConverter } from "../data/GroupClass";

const MAX_GROUP_SIZE = 100; // Hardcoded value for maximum number of students in a group

/**
 * Function that creates a group based
 * on set of preferences that a user
 * inputs into a PopUpForm. Saves data
 * in a database.
 */
export default function CreateGroupPopUp(props) {
  const userId = useUser().user.uwid;

  // Input values for creating group
  const [maxGroupSize, setMaxGroupSize] = useState(0);
  const [groupName, setGroupName] = useState("");
  const [classPrefix, setClassPrefix] = useState("");
  const [classNum, setClassNum] = useState(0);
  const [classSection, setClassSection] = useState("");
  const [topics, setTopics] = useState([]);
  const [meetInPerson, setMeetInPerson] = useState(false);

  // ***** VALIDATE INPUT *****
  function checkInput() {
    if (groupName == null || groupName.trim() === "") {
      alert("Enter a valid group name.");
      return false;
    }

    if (classPrefix == null || classPrefix.trim() === "") {
      alert("Enter a valid class prefix (Example: CSE, ENGL, MATH, etc).");
      return false;
    }

    if (classNum <= 99 || classNum > 1000) {
      alert("Enter a valid class number (between 0 and 1000)");
      return false;
    }

    if (maxGroupSize <= 1) {
      alert("Enter a valid group size (must be greater than 1).");
      return false;
    }
    return true;
  }

  // references to access GroupsCollection and UsersCollection
  const refGroups = firebase.firestore().collection("Groups");
  const refUsers = firebase.firestore().collection("Users");

  function recordData() {
    // ***** CHECK IF INPUT IS VALID *****

    if (!checkInput()) {
      return;
    }

    // Create new group by sending new group to firebase.

    const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

    refGroups
      .withConverter(GroupClassConverter)
      .add(
        new GroupClass(
          classNum,
          classPrefix,
          classSection,
          groupName,
          maxGroupSize,
          meetInPerson,
          [userId],
          userId,
          topics
        )
      )
      .then((docRef) => {
        refUsers.doc(userId).update({
          groups: arrayUnion(docRef.id),
        });
      });

    // TODO: FORMALLY CREATE A GROUP DOCUMENT
    // Right now, firebase automatically creates it for us,
    // I think we should do it explicitly, just for sanity.

    props.close();
  }

  function recordTopics(topicsIn) {
    let topicsWanted = [];
    if (topicsIn !== null) {
      topicsWanted = topicsIn.split(" ");
    }

    setTopics(topicsWanted);
  }

  return (
    <>
      <PopUpForm
        onSubmit={recordData}
        btnText="Create"
        close={() => props.close()}
      >
        <ValueInputer
          title="Group Name"
          type="text"
          onChange={(input) => setGroupName(input)}
        />
        <ValueInputer
          title="Class Prefix"
          type="text"
          onChange={(input) => setClassPrefix(input)}
        />
        <ValueInputer
          title="Class Number"
          type="number"
          min={100}
          pattern="[0-9]*"
          max={999}
          onChange={(input) => setClassNum(input)}
        />
        <ValueInputer
          title="Class Section (Optional)"
          type="text"
          onChange={(input) => setClassSection(input)}
        />
        <ValueInputer
          title="Topics of Interest (Optional)"
          type="text"
          onChange={recordTopics}
        />
        <ValueInputer
          title="Max Group Size"
          min={0}
          pattern="[0-9]*"
          max={MAX_GROUP_SIZE}
          type="number"
          onChange={(input) => setMaxGroupSize(input)}
        />

        <div className="inputField d-flex row justify-between align-center">
          <label>Meet In Person</label>
          <input
            className="inputComponent"
            type="checkbox"
            defaultChecked={meetInPerson}
            onChange={() => setMeetInPerson((prevVal) => !prevVal)}
          />
        </div>
      </PopUpForm>
    </>
  );
}
