import React, {useState, useEffect} from 'react';
import PopUpForm from "./PopUpForm";
import firebase from "firebase/app";
import "firebase/firestore";

const MAX_GROUP_SIZE = 100;  // Hardcoded value for maximum number of students in a group

export default function CreateGroup() {
    const [open, setOpen] = useState(false);

    const ref = firebase.firestore().collection("Groups");

    function recordData(maxGroupSize, groupName, classPrefix, 
                        classNum, classSection, topics, meetInPerson) {
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
                topic: topics
            }).then(() => {/*Provide some feedback to user to show that group was cerated*/
            });
            setOpen(false);
        }
    }

    return (
        <div>
            <button className="createGroupButton" onClick={() => setOpen(true)}>Create Group</button>
            {open ? <PopUpForm onChange={recordData} maxGroupSize={MAX_GROUP_SIZE}/> : null}
        </div>
    );
}
