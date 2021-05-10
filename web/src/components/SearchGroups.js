import React, {useState, useEffect} from 'react';
import PopUpForm from "./PopUpForm";
import firebase from "firebase/app";
import "firebase/firestore";
import { useUser } from "../providers/UserProvider";

const MAX_GROUP_SIZE = 100;  // Hardcoded value for maximum number of students in a group

/**
 * Function that returns search results from a database
 * based on user preferences entered in a PopUpForm.
 */

 export default function SearchGroups() {
    const [open, setOpen] = useState(false);
    const user = useUser.user;

    // references to access GroupsCollection and UsersCollection
    const refGroups = firebase.firestore().collection("Groups");
    const refUsers = firebase.firestore().collection("Users");

    function recordData(maxGroupSize, groupName, classPrefix, 
                        classNum, classSection, topics, meetInPerson, user) {
        const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
        if (user === undefined) {
            user = "temp"
        }

        // Get snapshot with limited results
        // Firebase's queries are kinda limited so I have to do this for at least some of the fields
        
        const snapshot = await refGroups.where('max_members', '<=', 'maxGroupSize').get();

        if (classPrefix !== "") {
            snapshot = snapshot.where('class_prefix', "==", "classPrefix");
        } 
        if (meetInPerson) {
            snapshot = snapshot.where('meet', "==", true);
        }
        
        // TODO: groupname, topics
        var results = parseSnapshot(snapshot, groupName, classNum, classSection, topics, meetInPerson);

        // Temporary test code, change later
        var display = "";
        for (i = 0; i < results.length; i++) {
            display.concat(results[i].group_name);
            display.concat("\n");
        }

        alert(display);
        setOpen(false);


    }

    // There has to be a better way to do this than this garbage right?
    function parseSnapshot(snapshot, groupName, classNum, classSection, topics) {
        var results = [];
        snapshot.forEach(function(childSnapshot) {
            if (groupName !== "" && !childSnapshot.group_name.includes("groupName")) {
                return;
            }

            if (classNum > 0) {
                if (classNum >= 100 && childSnapshot.class_num !== classNum) {
                    return;
                } else if (classNum >= 10 && (childSnapshot.class_num / 10) !== classNum) {
                    return;
                } else if ((childSnapshot.class_num / 100) !== classNum) {
                    return;
                }
            }
            
            if (classSection !== "" && childSnapshot.class_section.substring(0, classSection.length) !== classSection) {
                return;
            }

            if (topics !== [] && !topics.every(i => childSnapshot.topics.includes(i))) {
                return;
            }

            results.push(childSnapshot);
        });
        return results;
    }

    return (
        <div>
            <button className="searchGroupButton" onClick={() => setOpen(true)}>Search</button>
            {open ? <PopUpForm onChange={recordData} maxGroupSize={MAX_GROUP_SIZE} action = "Search"/> : null}
        </div>
    );
}

export default SearchGroup;
