import React, { useState, useEffect, useRef } from "react";
import "../styles/common.scss";
import "../components/MyGroupPanel";
import { useUser } from "../providers/UserProvider";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import { ChatClass, ChatClassConverter } from "../data/ChatClass";
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
  const [sent, setSent] = useState(true);

  console.log(props);

  const inputRef = useRef();

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
          console.log(tempMessages);
          console.log("firebase call");
        }
      );

    return () => {
      unsubscribeChat();
    };
  }, [props.groupID]);

  // Need to display a progress bar to tell user when file is ready to send
  function appendFile(fileLink, fileName) {
    setSent(false);
    setOutFileLink("<a href=" + fileLink + ">" + fileName + "</a>");
  }

  // Sends message to Firebase Database
  function sendMessage(outMessage) {
    if (outMessage === "" && outFileLink === "") {
      return;
    }

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
    setSent(true);
  }

  // Checks if message was sent by current user or another one.
  // Returns a true if it is from the logged-in user, false otherwise.
  function isOwnMessage(message) {
    return message.ownerId === user.uwid;
  }

  function closeTime(oldMessage, newMessage) {
    var oldTime =
      oldMessage.toDate().getHours() * 60 + oldMessage.toDate().getMinutes();
    var newTime =
      newMessage.toDate().getHours() * 60 + newMessage.toDate().getMinutes();
    return Math.abs(oldTime - newTime) < 10;
  }

  function buildMessageDisplay() {
    // Takes each individual message and wrapps it in a div
    // I need to bundle up any messages that are sequentially sent by same person
    // While messages.next is sent by same person, add the message to the same div.
    let output = [<div />];

    let i = 0;
    while (i < messages.length) {
      let ownerId = messages[i].ownerId;
      let ownerClassNameTag = isOwnMessage(messages[i])
        ? "ownMessageOwner"
        : "otherMessageOwner";
      let messageClassNameTag = isOwnMessage(messages[i])
        ? "ownMessageContent"
        : "otherMessageContent";

      // Create new div for message, and create new div for owner name
      let iOld = i;
      let temp = [
        <div className="messageTime">
          {formatDate(messages[i].time.toDate())}
        </div>,
      ];
      temp.push(<div className={ownerClassNameTag}> {messages[i].owner} </div>);

      do {
        // bundle into one
        // Parse out the links so users can click on them
        let messageContents = messages[i].content;
        if (
          messageContents.includes("<a href=") &&
          messageContents.includes("</a>")
        ) {
          let startIndex = messageContents.indexOf("<a href=");
          let tagLength = "<a href=".length;
          let contents = messageContents.substring(0, startIndex);
          let remainingContents = messageContents.substring(startIndex);
          let link = remainingContents.substring(
            tagLength,
            remainingContents.indexOf(">")
          );
          let name = remainingContents.substring(
            remainingContents.indexOf(">") + 1,
            remainingContents.lastIndexOf("<")
          );
          if (contents.length > 0)
            temp.push(
              <div className={messageClassNameTag}>
                <p>{contents}</p>
              </div>
            );

          temp.push(
            <a className={messageClassNameTag + " linkTag"} href={link}>
              <p>{name}</p>
            </a>
          );
        } else {
          temp.push(
            <div className={messageClassNameTag}>
              <p>{messages[i].content}</p>
            </div>
          );
        }

        i++;
      } while (
        i < messages.length &&
        ownerId === messages[i].ownerId &&
        closeTime(messages[iOld].time, messages[i].time)
      );

      output.push(
        <div className="messageContent" key={messages[iOld].id}>
          {temp}
          <br></br>
        </div>
      );
    }

    return output;
  }

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

  function sendOnEnter(e) {
    if (e.charCode === 13 /* enter */) {
      sendMessage(outMessage);
    }
  }

  function focusChat() {
    inputRef.current.focus();
  }

  return (
    <>
      <div className="chatWindow d-flex col">
        <div className="chatMsgArea flex-grow" onClick={focusChat}>
          {buildMessageDisplay()}
        </div>
        <div className="chatOptions d-flex row justify-center align-center">
          <AddFile
            firebase={firebase}
            onChange={appendFile}
            user={user}
            sentLink={sent}
          />
          <input
            className="messageInputer"
            value={outMessage}
            onChange={(event) => setOutMessage(event.target.value)}
            onKeyPress={sendOnEnter}
            type="text"
            ref={inputRef}
          />

          <button
            className="sendButton btnPrimaryFill"
            onClick={() => sendMessage(outMessage)}
          >
            Send Message
          </button>
        </div>
      </div>
    </>
  );
}
