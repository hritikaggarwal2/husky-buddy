import React, {useState, useEffect} from 'react';
import firebase from "firebase/app";
import "firebase/firestore";
import { useUser } from "../providers/UserProvider";


/**
 * Function returns all ID numbers of
 * the groups a logged in user is part of
 */
export default async function GetUserGroups() {
    //let user = useUser.user;
    // EDIT THIS SECTION, to store temp user value
    let user = "4zmEw8xE1ehszvmSV7Vz";
    const refUsers = firebase.firestore().collection("Users");

    const groupsRef = refUsers.doc(user).data();
    const groups = await groupsRef.groups;

    console.log(groups);
    return groups;
    /*.then(
        (snapshot) => {
            setGroups(snapshot.get("groups"))});*/


}