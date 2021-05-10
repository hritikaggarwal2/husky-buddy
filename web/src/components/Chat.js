import React, { useState, useEffect } from "react";
import CreateGroup from "../components/CreateGroup";
import "../styles/CreateGroup.css";
import "../components/MyGroupPanel";
import MyGroupPanel from "../components/MyGroupPanel";
import firebase from "firebase/app";
import "firebase/firestore";
import ValueInputer from "./ValueInputer";
import "../styles/Chat.css";

/**
 *
 * @param props must contain
 *      -groupID: the groupId stored in Firebase to which
 *                  the chat belongs.
 */
export default function Chat(props) {
  // TODO: Update group ID to the actual one
  const [groupID, setGroupID] = useState("2jQWkuzyGzmzSQWpGOfC");
  const [messages, setMessages] = useState([]);
  const [outMessage, setOutMessage] = useState("");
  //const user = useUser.user;
  const user = "4zmEw8xE1ehszvmSV7Vz";

  useEffect(() => {
    // Store all chat messages and update if there
    // is a new one coming in
    const chatRef = firebase
      .firestore()
      .collection("Chats")
      .doc(groupID)
      .collection("chat")
      .orderBy("time")
      .onSnapshot((snapshot) => {
        const tempMessages = [];
        snapshot.forEach((message) => {
          tempMessages.push(message.data());
        });
        setMessages(tempMessages);
      });
  }, []);

  // Sends message to Firebase Database
  function sendMessage() {
    const chatRef = firebase
      .firestore()
      .collection("Chats")
      .doc(groupID)
      .collection("chat");
    let result = chatRef
      .add({
        content: outMessage,
        owner: user,
        time: firebase.firestore.Timestamp.now(),
      })
      .then((docRef) => {
        /*
            // TODO: change "4zmEw8xE1ehszvmSV7Vz" to actual userID
            refUsers.doc("4zmEw8xE1ehszvmSV7Vz").update({
                groups: arrayUnion(docRef.id)
            });
             */
        alert("Chat Sent!");
      });
    setOutMessage("");
  }

  // Displays a single message to the chat window
  // ADD MORE FUNCTIONALITY, I.e. display who sent it and time
  function displayMessage(message) {
    return (
      <div className="MessageContents">
        <p> Message: {message.content} </p>
        <p> Sent by: {message.owner} </p>
        <p> Time sent: {message.time.toString()} </p>
        <p> ... </p>
      </div>
    );
  }

  return (
    <div className="ChatWindow">
      <div className="Chats">{messages.map(displayMessage)}</div>
      <input
        className="MessageInputer"
        value={outMessage}
        onChange={(event) => setOutMessage(event.target.value)}
        type={"string"}
      />
      <button onClick={sendMessage}> Send Message</button>
    </div>
  );
}
