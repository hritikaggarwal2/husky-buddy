import React, { useState, useEffect } from "react";
import "../styles/common.scss";
import "../components/MyGroupPanel";
import { useUser } from "../providers/UserProvider";
import firebase from "firebase/app";
import "firebase/firestore";
import "../styles/common.scss";

import { ChatClass, ChatClassConverter } from "../data/ChatClass";
/**
 *
 * @param props must contain
 *      -groupID: the groupId stored in Firebase to which
 *                  the chat belongs.
 */
export default function Chat(props) {
  // TODO: Update group ID to the actual one
  const [messages, setMessages] = useState([]);
  const [outMessage, setOutMessage] = useState("");

  const user = useUser().user;

  useEffect(() => {
    // Store all chat messages and update if there
    // is a new one coming in
    const unsubscribeChat = firebase
      .firestore()
      .collection(`Chats/${props.groupID.id}/chat`)
      .withConverter(ChatClassConverter)
      .orderBy("time")
      .onSnapshot(
        {
          // Listen for document metadata changes
          includeMetadataChanges: true,
        },
        (snapshot) => {
          const tempMessages = [];
          snapshot.forEach((message) => {
            tempMessages.push({ ...message.data(), id: message.id });
          });
          setMessages(tempMessages);
        }
      );

    return () => {
      unsubscribeChat();
    };
  }, [props.groupID]);

  // Sends message to Firebase Database
  function sendMessage() {
    firebase
      .firestore()
      .collection(`Chats/${props.groupID.id}/chat`)
      .withConverter(ChatClassConverter)
      .add(
        new ChatClass(
          outMessage,
          user.display_name,
          user.uwid,
          firebase.firestore.Timestamp.now()
        )
      );
      
    setOutMessage("");
  }

  return (
    <div className="chatWindow">
      <div className="chats">
        {messages.map((message) => (
          <div className="MessageContents" key={message.id}>
            <p> Message: {message.content} </p>
            <p> Sent by: {message.owner} </p>
            <p> Time sent: {message.time.toString()} </p>
            <p> ... </p>
          </div>
        ))}
      </div>
      <input
        className="messageInputer"
        value={outMessage}
        onChange={(event) => setOutMessage(event.target.value)}
        type="text"
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}
