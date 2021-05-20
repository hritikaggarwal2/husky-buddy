import React, { useState, useEffect } from "react";
import "../styles/common.scss";
import "../components/MyGroupPanel";
import { useUser } from "../providers/UserProvider";
import firebase from "firebase/app";
import "firebase/firestore";

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

  // Checks if message was sent by current user or another one.
  // Returns a true if it is from the logged-in user, false otherwise.
  function isOwnMessage(message) {
    return message.ownerId == user.uwid;
  }

  return (
    <div className="chatWindow">
      <div className="chatMsgArea">
        {messages.map((message) => (
          <div className="messageContents" key={message.id}>
            <div className={isOwnMessage(message) ? "ownMessageOwner" : "otherMessageOwner"}>
              {message.owner}
            </div>
            <div className={isOwnMessage(message) ? "ownMessageContent" : "otherMessageContent"}>
              <p>{message.content}</p>
            </div>
            <div className={isOwnMessage(message) ? "ownMessageTime" : "otherMessageTime"}>
              {formatDate(message.time.toDate())}
            </div>
            <br></br>
          </div>
        ))}
      </div>
      <br></br>
      <div class="row">
        <input
          className="messageInputer"
          value={outMessage}
          onChange={(event) => setOutMessage(event.target.value)}
          type="text"
        />
        <button className="sendButton" onClick={sendMessage}>Send Message</button>
      </div>
    </div>
  );

  // stack overflow fn
  function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return (
      strTime +
      " " +
      date.getMonth() +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear()
    );
  }
}
