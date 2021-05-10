import React, {useState, useEffect} from 'react';
import "../styles/common.scss";
import useUser from "../providers/UserProvider";
import firebase from "firebase/app";
import "firebase/firestore";
import PanelView from "../screens/PanelView";
import GetUserGroups from "./GetUserGroups";

/**
 * Function that displays a side panel with the
 * links to the groups a user is a member of.
 *
 */
export default function MyGroupPanel() {
    const [groups, setGroups] = useState([]);

    // Retrieve the values of the groups
    useEffect(() => {
        // EDIT THIS SECTION, to store temp user value
        let user = "4zmEw8xE1ehszvmSV7Vz";

        const refUsers = firebase.firestore().collection("Users");

        const groupsRef = refUsers.doc(user).get().then(
            (snapshot) => {
                setGroups(snapshot.get("groups"))});
        //setGroups(GetUserGroups());

    }, []);

    // Display all values of a group
    let displayList = [];
    for (let i = 0; i < groups.length; i++) {
        let groupName = groups[i];
        // TODO: FIX "/panelview" to actually point to a group's chat
        displayList.push(<li><a href={"/panelview"}>{groups[i]}</a></li>);
    }

    return (
        <div className= "myGroupPanel">MY GROUPS
            {displayList}
        </div>
    );
}