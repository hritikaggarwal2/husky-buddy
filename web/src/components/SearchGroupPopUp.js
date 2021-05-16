import React, { useState, useCallback, useRef } from "react";
import PopUpForm from "./PopUpForm";
import ValueInputer from "./ValueInputer";

import firebase from "firebase/app";
import "firebase/firestore";

import { useUser } from "../providers/UserProvider";

import { GroupClass, GroupClassConverter } from "../data/GroupClass";

const MAX_GROUP_SIZE = 100; // Hardcoded value for maximum number of students in a group

/**
 * Function searches groups from a database
 * based on user preferences entered in a PopUpForm.
 *
 * @param props - Must include:
 *                     - Function to call to open popUp
 *                     - Function to call to close popUp
 *                     - Function to call to display results
 */
export default function SearchGroups(props) {
  const userId = useUser().user.uwid;
  const [groups, setGroups] = useState([]);
  const [searching, setSearching] = useState(false);

  // Input values for searching a group
  const [groupName, setGroupName] = useState("");
  const groupNameRef = useRef(groupName);
  const [maxGroupSize, setMaxGroupSize] = useState(0);
  const groupSizeRef = useRef(maxGroupSize);
  const [classPrefix, setClassPrefix] = useState("");
  const classPrefixRef = useRef(classPrefix);
  const [classNum, setClassNum] = useState(0);
  const classNumRef = useRef(classNum);
  const [classSection, setClassSection] = useState("");
  const classSectionRef = useRef(classSection);
  const [topics, setTopics] = useState("");
  const topicsRef = useRef(topics);
  const [meetInPerson, setMeetInPerson] = useState(false);
  const meetInPersonRef = useRef(meetInPerson);

  // Currently unimplemented values
  //const [classSection, setClassSection] = useState("");
  //const [topics, setTopics] = useState([]);

  function updateGroupName(newState) {
    groupNameRef.current = newState;
    setGroupName(newState);
  }

  function updateGroupSize(newState) {
    groupSizeRef.current = newState;
    setMaxGroupSize(newState);
  }

  function updateClassPrefix(newState) {
    classPrefixRef.current = newState;
    setClassPrefix(newState);
  }

  function updateClassNum(newState) {
    classNumRef.current = newState;
    setClassNum(newState);
  }

  function updateClassSection(newState) {
    classSectionRef.current = newState;
    setClassSection(newState);
  }

  function updateTopics(newState) {
    topicsRef.current = newState;
    setTopics(newState);
  }

  function updateMeetInPerson(newState) {
    meetInPersonRef.current = newState;
    setMeetInPerson(newState);
  }

  const refGroups = firebase.firestore().collection("Groups");

  const [isSending, setIsSending] = useState(false);
  const sendRequest = useCallback(async () => {
    // don't send again while we are sending
    if (isSending) return;

    // update state
    setIsSending(true);

    // ***** CHECK IF INPUT IS VALID *****
    if (!checkInput()) {
      setIsSending(false);
      return;
    }

    // send the actual request
    await refGroups.get().then((querySnapshot) => {
      let tempGroups = [];
      let searchnamelc = groupNameRef.current.toLowerCase();
      querySnapshot.forEach((doc) => {
        //console.log("I WAS here");
        //console.log(doc.id, " => ", doc.data());
        // Firebase queries are fairly limited (you can only do one == check per query, for example)
        // so part of the work has to be done here
        if (
          doc.get("class_num") !== classNumRef.current ||
          parseInt(doc.get("max_members")) > parseInt(groupSizeRef.current)
        ) {
          return;
        } else if (meetInPersonRef.current && !doc.get("meet")) {
          return;
        } else if (
          groupNameRef.current != null &&
          groupNameRef.current !== ""
        ) {
          var docnamelc = doc.get("group_name").toLowerCase();
          if (!docnamelc.includes(searchnamelc)) {
            return;
          }
        }
        tempGroups.push(doc);
      });

      // groups will store a doc which has .id and .data()...

      setGroups(tempGroups);
      props.close();
      props.displayGroups(tempGroups);
    });

    // once the request is sent, update state again
    setIsSending(false);
  }, [isSending]); // update the callback if the state changes

  // Helper function for determining if queries match topics
  function parseTopic(topicQuery, resultTopics) {
    let matches = 0;
    // For every topic the user inputs...
    topicQuery.forEach((term) => {
      // If this group doesn't include that topic, set the bool that says this isn't a match
      resultTopics.forEach((topic) => {
        if (term.toLowerCase() === topic.toLowerCase()) {
          matches += 1;
          return;
        }
      });
    });
    // If this group doesn't include all the user's topics, return false
    if (matches != topicQuery.length) {
      return false;
      // Otherwise, return true
    } else {
      return true;
    }
  }

  // ***** VALIDATE INPUT *****
  function checkInput() {
    // Ommited parameters
    /*if (groupName == null || groupName.trim() === "") {
        alert("Enter a valid group name.");
        return false;
        }*/

    if (groupNameRef.current == null) {
      groupNameRef.current = "";
    }
    if (classPrefixRef.current == null) {
      classPrefixRef.current = "";
    }

    if (
      classNumRef.current == null ||
      parseInt(classNumRef.current) < 0 ||
      parseInt(classNumRef.current) > 1000
    ) {
      alert(
        "Enter a valid class number (between 0 and 999). \n Use 0 if you wish to search all class numbers."
      );
      return false;
    }

    if (classSectionRef.current == null) {
      classSectionRef.current = "";
    }

    if (topicsRef.current == null) {
      topicsRef.current = "";
    }

    if (groupSizeRef.current == null) {
      groupSizeRef.current = -1;
    }
    /* if (parseInt(groupSizeRef.current) <= 1) {
      alert("Enter a valid group size (must be greater than 1).");
      return false;
    } */

    return true;
  }

  return (
    <>
      <PopUpForm
        onSubmit={sendRequest}
        btnText="Search"
        close={() => props.close()}
      >
        <ValueInputer
          title="Group Name"
          type="text"
          onChange={(input) => updateGroupName(input)}
        />
        <ValueInputer
          title="Class Prefix"
          type="text"
          onChange={(input) => updateClassPrefix(input)}
        />
        <ValueInputer
          title="Class Number"
          type="number"
          min={0}
          pattern="[0-9]*"
          max={999}
          onChange={(input) => updateClassNum(input)}
        />
        <ValueInputer
          title="Class Section"
          type="text"
          onChange={(input) => updateClassSection(input)}
        />
        <ValueInputer
          title="Topics of Interest"
          type="text"
          onChange={(input) => updateTopics(input)}
        />
        <ValueInputer
          title="Max Group Size"
          min={0}
          pattern="[0-9]*"
          max={MAX_GROUP_SIZE}
          type="number"
          onChange={(input) => updateGroupSize(input)}
        />

        <div className="inputField d-flex row justify-between align-center">
          <label>Meet In Person</label>
          <input
            className="inputComponent"
            type="checkbox"
            defaultChecked={meetInPerson}
            onChange={() => updateMeetInPerson((prevVal) => !prevVal)}
          />
        </div>
      </PopUpForm>
    </>
  );
}
