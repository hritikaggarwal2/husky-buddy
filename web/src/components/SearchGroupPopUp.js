import React, {useState, useEffect} from 'react';
import PopUpForm from "./PopUpForm";
import ValueInputer from "./ValueInputer";

import firebase from "firebase/app";
import "firebase/firestore";

import { useUser } from "../providers/UserProvider";

import { GroupClass, GroupClassConverter } from "../data/GroupClass";

const MAX_GROUP_SIZE = 100;  // Hardcoded value for maximum number of students in a group

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

    // Input values for searching a group
    const [maxGroupSize, setMaxGroupSize] = useState(0);
    const [classPrefix, setClassPrefix] = useState("");
    const [classNum, setClassNum] = useState(0); 
    const [meetInPerson, setMeetInPerson] = useState(false);

    // Ommited values from search function
    //const [groupName, setGroupName] = useState("");
    //const [classSection, setClassSection] = useState("");
    //const [topics, setTopics] = useState([]);

    const refGroups = firebase.firestore().collection("Groups");

    // ***** VALIDATE INPUT *****
    function checkInput() {
        // Ommited parameters
        /*if (groupName == null || groupName.trim() === "") {
        alert("Enter a valid group name.");
        return false;
        }*/

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
    
    function searchGroups() {
        // ***** CHECK IF INPUT IS VALID *****
        if (!checkInput()) {
            return;
        }

        refGroups
            .where('class_prefix', '==', classPrefix)
            // TODO: Add more filtering parameters, when I tried it didn't want to work
            //.where('max_members', '<=', parseInt(maxGroupSize))
            //.where('meet', '==', meetInPerson)
            .get()
            .then((querySnapshot) => {
                let tempGroups = [];
                querySnapshot.forEach((doc) => {
                    //console.log("I Ws here");
                    //console.log(doc.id, " => ", doc.data());
                    tempGroups.push(doc);
                });

                // groups will store a doc which has .id and .data()...
                setGroups(tempGroups);
            });
        
        // TODO: We need to display the groups somewhere here*/
        props.close();
        console.log("Groups is empty, why????" + groups.length);
        groups.forEach((doc) => {
            console.log("ID's ARE:");
            console.log(doc.id);
        });
        props.displayGroups(groups);
        return;
    }

    // Ommited functionality
    /*function recordTopics(topicsIn) {
        let topicsWanted = [];
        if (topicsIn !== null) {
          topicsWanted = topicsIn.split(" ");
        }
    
        setTopics(topicsWanted);
      }*/

    return (
        /*Values ommited:
        <ValueInputer
              title="Group Name"
              type="text"
              onChange={(input) => setGroupName(input)}
            />

            <ValueInputer
              title="Topics of Interest (Optional)"
              type="text"
              onChange={recordTopics}
            />

            <ValueInputer
              title="Class Section (Optional)"
              type="text"
              onChange={(input) => setClassSection(input)}
            />
            
             */
        <>
          <PopUpForm
            onSubmit={searchGroups}
            btnText="Search"
            close={() => props.close()}
          >
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