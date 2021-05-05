import React, {useState, useEffect} from 'react';
import PopUpForm from "./PopUpForm";
import firebase from "firebase/app";
import "firebase/firestore";
import { useUser } from "../providers/UserProvider";

const MAX_GROUP_SIZE = 100;  // Hardcoded value for maximum number of students in a group

/**
 * Function that creates a group based
 * on set of preferences that a user
 * inputs into a PopUpForm. Saves data
 * in a database.
 */
export default function CreateGroup() {
    const [open, setOpen] = useState(false);
    //const user = useUser.user;

    const ref = firebase.firestore().collection("Groups");

    function recordData(maxGroupSize, groupName, classPrefix, 
                        classNum, classSection, topics, meetInPerson, user) {
        if (user === undefined) {
            user = "temp"
        }

        if (groupName === "") {
            setOpen(false)
        } else {
            // SEND DATA TO FIREBASE SERVER
            ref.add({
                class_num: classNum,
                class_prefix: classPrefix,
                class_section: classSection,
                group_name: groupName,
                max_members: maxGroupSize,
                meet: meetInPerson,
                topic: topics,
                members: [user],
                owner: user,
            }).then(() => {/*Provide some feedback to user to show that group was cerated*/
            });

            setOpen(false);
        }
    }

    return (
        <div>
            <button className="createGroupButton" onClick={() => setOpen(true)}>Create Group</button>
            {open ? <PopUpForm onChange={recordData} maxGroupSize={MAX_GROUP_SIZE} action = "Create"/> : null}
        </div>
    );
}
