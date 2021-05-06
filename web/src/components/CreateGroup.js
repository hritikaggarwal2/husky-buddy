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

        if (groupName === "") {
            setOpen(false)
            return;
        }

        // SEND DATA TO FIREBASE SERVER
        let result = refGroups.add({
            class_num: classNum,
            class_prefix: classPrefix,
            class_section: classSection,
            group_name: groupName,
            max_members: maxGroupSize,
            meet: meetInPerson,
            topic: topics,
            members: [user],
            owner: user,
        }).then((docRef) => {
            // TODO: change "4zmEw8xE1ehszvmSV7Vz" to actual userID
            refUsers.doc("4zmEw8xE1ehszvmSV7Vz").update({
                groups: arrayUnion(docRef.id)
            });
            alert("Group Created!");
        });

        setOpen(false);


    }

    return (
        <div>
            <button className="createGroupButton" onClick={() => setOpen(true)}>Create Group</button>
            {open ? <PopUpForm onChange={recordData} maxGroupSize={MAX_GROUP_SIZE} action = "Create"/> : null}
        </div>
    );
}
