import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "../styles/common.scss";
import "../components/MyGroupPanel";
import { useUser } from "../providers/UserProvider";
import firebase from "firebase/app";
import "firebase/firestore";

import { ChatClass, ChatClassConverter } from "../data/ChatClass";
import MyGroupSidePanel from "../components/MyGroupSidePanel";
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

  function buildMessageDisplay() {
    // Takes each individual message and wrapps it in a div
    // I need to bundle up any messages that are sequentially sent by same person
    // While messages.next is sent by same person, add the message to the same div.
    let output = [];
    output.push('<div className="chatMsgArea">');
    let i = 0;
    while (i < messages.length) {
      let ownerId = messages[i].ownerId;
      let ownerClassNameTag = isOwnMessage(messages[i]) ? "ownMessageOwner" : "otherMessageOwner";
      let messageClassNameTag = isOwnMessage(messages[i]) ? "ownMessageContent" : "otherMessageContent";
      let timeClassNameTag = isOwnMessage(messages[i]) ? "ownMessageTime" : "otherMessageTime";

      // Create new div for message, and create new div for owner name
      output.push('<div className="messageContents" key=' + messages[i].id + '>');
      output.push('<div className=' + ownerClassNameTag + '>' + messages[i].owner + '</div>');
      
      do {
        // bundle into one
        output.push('<div className=' + messageClassNameTag + '><p>' + messages[i].content + '</p></div>');
        output.push('<div className=' + timeClassNameTag + '>' + formatDate(messages[i].time.toDate()) + '</div>');
        i++;
      } while (i < messages.length && (ownerId === messages[i].ownerId));

      output.push('<br></br></div>');
    }
    output.push('</div>');


    let htmlOutput = [];
    let parser = new DOMParser();

    /*for (let j = 0; j < output.length; j++) {
      htmlOutput.push(parser.parseFromString(output[i], 'text/html').body);
      console.log('Output: ->>');
      console.log(htmlOutput[j]);
    }*/

    //output.map((item) => htmlOutput.push(parser.parseFromString(item, "text/html").body));
   //et doc = new DOMParser().parseFromString(output, "text/xml");
   // output.map((item) => parser.parseFromString(item, "text/html").body) }

    return (
      output.map((item) => parser.parseFromString(item, "text/html").body)
    );
  }

  
  return (
    
    <div className="chatScreen">
      <Link to="/dashboard" className="backBtn">Back</Link>
      {/*<div className="sideBar">
          <MyGroupSidePanel/>
        </div>*/}
      <div className="chatWindow">
        {buildMessageDisplay()}
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
