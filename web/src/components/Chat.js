import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "../styles/common.scss";
import "../components/MyGroupPanel";
import { useUser } from "../providers/UserProvider";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import { ChatClass, ChatClassConverter } from "../data/ChatClass";
import MyGroupSidePanel from "../components/MyGroupSidePanel";
import Slideout from "../components/Slideout";
import AddFile from "../components/AddFile";

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
  const [outFileLink, setOutFileLink] = useState("");

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

  // Need to display a progress bar to tell user when file is ready to send
  function appendFile(fileLink, fileName) {
    setOutFileLink("<a href=" + fileLink + ">" + fileName + "</a>");
  }

  // Sends message to Firebase Database
  function sendMessage(outMessage) {
    let newOutMessage = outMessage.concat(outFileLink);
    firebase
      .firestore()
      .collection(`Chats/${props.groupID.id}/chat`)
      .withConverter(ChatClassConverter)
      .add(
        new ChatClass(
          newOutMessage,
          user.display_name,
          user.uwid,
          firebase.firestore.Timestamp.now()
        )
      );
    
    setOutFileLink("");
    setOutMessage("");
  }

  // Checks if message was sent by current user or another one.
  // Returns a true if it is from the logged-in user, false otherwise.
  function isOwnMessage(message) {
    return message.ownerId == user.uwid;
  }

  function buildMessageDisplay() {
    // Takes each individual message and wrapps it in a div
    // I need to bundle up any messages that are sequentially sent by same person
    // While messages.next is sent by same person, add the message to the same div.
    let output = [<div/>];

    let i = 0;
    while (i < messages.length) {
      let ownerId = messages[i].ownerId;
      let ownerClassNameTag = isOwnMessage(messages[i]) ? "ownMessageOwner" : "otherMessageOwner";
      let messageClassNameTag = isOwnMessage(messages[i]) ? "ownMessageContent" : "otherMessageContent";
      let timeClassNameTag = isOwnMessage(messages[i]) ? "ownMessageTime" : "otherMessageTime";

      // Create new div for message, and create new div for owner name
      let iOld = i;
      let temp = [<div className={ownerClassNameTag}> {messages[i].owner} </div>]

      
      do {
        // bundle into one

        let messageContents = messages[i].content;
        if (messageContents.startsWith('<a href=') && messageContents.endsWith('</a>')) {
          let link = messageContents.substring(messageContents.indexOf("=") + 1, messageContents.indexOf(">"));
          let name = messageContents.substring(messageContents.indexOf(">") + 1, messageContents.lastIndexOf("<"));
          temp.push(<a href={link}>{name}</a>);
        } else
          temp.push(<div className={messageClassNameTag}><p>{messages[i].content}</p></div>);

        temp.push(<div className={timeClassNameTag} >{formatDate(messages[i].time.toDate())}</div>);
        i++;
      } while (i < messages.length && (ownerId === messages[i].ownerId));

      output.push(<div className="messageContent" key={messages[iOld].id}>{temp}<br></br></div>);
    }


    return (
      <div className="chatMsgArea">
        {output}
      </div>
    );
  }

  
  return (
    <div className="chatScreen">
      <Link to="/dashboard" className="backBtn">Back</Link>
      <div className="sideBar"><MyGroupSidePanel/></div>
      <Slideout firebase={firebase} groupID={props.groupID} user = {user} />
      <div className="chatWindow">
        {buildMessageDisplay()}
        <br></br>
        <div className="row">
          <input
            className="messageInputer"
            value={outMessage}
            onChange={(event) => setOutMessage(event.target.value)}
            type="text"
          />
          <AddFile firebase={firebase} onChange={appendFile} user={user}/>
          <button className="sendButton" onClick={() => sendMessage(outMessage)}>Send Message</button>
        </div>
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
