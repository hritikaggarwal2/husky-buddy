import React, {useState, useEffect} from 'react';
import CreateGroup from "../components/CreateGroup";
import "../styles/CreateGroup.css";
import "../components/MyGroupPanel";
import MyGroupPanel from "../components/MyGroupPanel";
import firebase from "firebase/app";
import "firebase/firestore";

/**
 *
 * @param props must contain
 *      -groupID: the groupId stored in Firebase to which
 *                  the chat belongs.
 */
export default function Chat(props) {
    // TODO: Update group ID to the actual one
    const [groupID, setGroupID] = useState("2jQWkuzyGzmzSQWpGOfC");

    // Retrieves the chat from Firebase
    function getChat() {
        // this renders all the messages stored
        // Might be rendering twice????
        const chatRef = firebase.firestore()
            .collection("Chats").doc(groupID).collection("chat")
            .orderBy('time').onSnapshot((snapshot) => {
                const messages = [];
                snapshot.forEach( message => {
                    messages.push(message.data())
                });
                console.log(messages)});
    }


    // Sends message to Firebase Database
    /*function sendMessage() {

    }*/

    function getMessage() {
        // CODE BELOW is working copy from getChat() function
        // this renders all the messages stored, BUT we need to render only new messages
        /*const chatRef = firebase.firestore()
            .collection("Chats").doc(groupID).collection("chat")
            .orderBy('time', 'desc').onSnapshot(snapshot => {
                const messages = snapshot.docs.map(doc => {
                    const data = doc.data();
                });
                snapshot.forEach((message) => {
                    messages.push(message.data())
                });
                console.log(messages)});*/
        return;
    }

    return (
        <div className="Chat">
            THIS IS A CHAT
            {getChat()}
            {getMessage()}
        </div>
    );
}