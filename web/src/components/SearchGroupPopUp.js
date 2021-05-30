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

    console.log("Group name Is: ", groupNameRef.current);
    console.log("Class prefix Is: ", classPrefixRef.current);
    console.log("Class number Is: ", classNumRef.current);
    console.log("Max class size Is: ", groupSizeRef.current);

    // ***** CHECK IF INPUT IS VALID *****
    if (!checkInput()) {
      setIsSending(false);
      return;
    }

    // send the actual request
    //await API.sendRequest()
    await refGroups
      .get()
      .then((querySnapshot) => {
        let tempGroups = [];
        let searchnamelc = groupNameRef.current.toLowerCase();
        querySnapshot.forEach((doc) => {
          //console.log("I WAS here");
          //console.log(doc.id, " => ", doc.data());
          // Firebase queries are fairly limited (you can only do == checks on one field per query, for example)
          // so part of the filtering work has to be done here. It's messy but it seems to work
          if (classPrefixRef.current != null && classPrefixRef.current !== "" && !doc.get("class_prefix").toLowerCase().includes(classPrefixRef.current.toLowerCase())) {
            console.log("Failed prefix match: searched for " + classPrefixRef.current + " result was " + doc.get("class_prefix"));
            return;
          } else if (groupSizeRef.current !== "" && parseInt(groupSizeRef.current) > 0 && parseInt(doc.get("max_members")) > parseInt(groupSizeRef.current)) {
            console.log("Failed group size match: searched for max " + parseInt(groupSizeRef.current) + " result was " + parseInt(doc.get("max_members")));
            return;
          } else if (meetInPersonRef.current && !doc.get("meet")) {
            console.log("Failed meet match: meet is " + meetInPersonRef.current + " result was " + doc.get("meet"));
            return;
          }

          if (classNumRef.current != null && classNumRef.current !== "" && parseInt(classNumRef.current) !== 0) {
            let num = parseInt(doc.get("class_num"));
            let search = parseInt(classNumRef.current);
            if (search < 0 || (search > 0 && search < 10 && Math.floor(num / 100) !== search) ||
              (search >= 10 && search < 100 && Math.floor(num / 10) !== search) || (search >= 100 && num !== search)) {
              console.log("Failed number match: searched for " + search + " result was " + num);
              return;
            }
          }
          if (groupNameRef.current != null && groupNameRef.current !== "") {
            var docnamelc = doc.get("group_name").toLowerCase();
            if (!docnamelc.includes(searchnamelc)) {
              console.log("Failed name match");
              return;
            }
          }
          if (classSectionRef.current != null && classSectionRef.current !== "") {
            var query = classSectionRef.current.toUpperCase();
            if (query !== doc.get("class_section").toUpperCase().substring(0, query.length)) {
              console.log("Failed section match");
              return;
            }
          }
          if (topicsRef.current != null && topicsRef.current !== "") {
            // split both the user's query and the topics of the group into string arrays
            let topicArray = topicsRef.current.split(" ");
            // let entryTopic = JSON.stringify(doc.get("topic")).toLowerCase().split(",");
            // let entry = JSON.stringify(doc.get("topic"));
            // let entryTopic = entry.substring(1, entry.length - 1).split(",");
            let entryTopic = doc.get("topic");
            console.log("Topics: " + entryTopic);
            // Checks if this group has topics; if they don't, we skip to the next entry, if they do we go in
            if (entryTopic == null || entryTopic === 0 || entryTopic.length === 0) {
              console.log("Failed topic match (0 array)");
              return;
            } else if (!parseTopic(topicArray, entryTopic)) {
              console.log("Failed topic match (no matches)");
              return;
            }
          }
          // This group meets all the conditions, push it to the results
          tempGroups.push(doc);
        });

        // groups will store a doc which has .id and .data()...
        console.log("TEMP GROUPS");
        console.log(tempGroups);

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
      console.log("Term: " + term);
      // If this group doesn't include that topic, set the bool that says this isn't a match
      resultTopics.forEach((topic) => {
        console.log("Topic: " + topic);
        if (term.toLowerCase() === topic.toLowerCase()) {
          console.log("Match on " + topic);
          matches += 1;
          return;
        }
      })
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

    //console.log("CHECK INPUT");
    //console.log("Class prefix Is: ", classPrefixRef.current);
    //console.log("Class number Is: ", classNumRef.current);
    //console.log("Max class size Is: ", groupSizeRef.current);

    if (groupNameRef.current == null) {
      groupNameRef.current = "";
    }
    if (classPrefixRef.current == null) {
      classPrefixRef.current = "";
    }

    console.log(classNumRef.current);
    console.log(parseInt(classNumRef.current));

    if (
      classNumRef.current == null ||
      parseInt(classNumRef.current) < 0 ||
      parseInt(classNumRef.current) > 1000
    ) {
      alert("Enter a valid class number (between 0 and 999). \n Use 0 if you wish to search all class numbers.");
      return false;
    }

    if (classSectionRef.current == null) {
      classSectionRef.current = "";
    }

    if (topicsRef.current == null) {
      topicsRef.current = "";
    }

    console.log(groupSizeRef.current);
    console.log(parseInt(groupSizeRef.current));

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
