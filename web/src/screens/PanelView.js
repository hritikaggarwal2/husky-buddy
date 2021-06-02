// Node Modules
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import "../components/MyGroupPanel";
import Chat from "../components/Chat";
import PageContainer from "../components/PageContainer";

// Firebase
import firebase from "firebase/app";
import "firebase/firestore";
import { useUser } from "../providers/UserProvider";

/**
 *
 * @param props must contain
 *      -groupID: the groupId stored in Firebase to which
 *                  the chat belongs.
 */
export default function PanelView(props) {
  const location = useLocation();
  const [search, setSearch] = useState();
  const [chat, setChat] = useState(location?.state?.group.id);

  const user = useUser().user;
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("Groups")
      .where("members", "array-contains", user.uwid)
      .onSnapshot(
        {
          // Listen for document metadata changes
          includeMetadataChanges: true,
        },
        (snapshot) => {
          let allGroups = [];
          snapshot.docs.forEach((doc) => {
            allGroups.push({ ...doc.data(), id: doc.id });
          });
          setGroups(allGroups);
          console.log("firebase call");
        }
      );

    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <>
      <PageContainer
        index={1}
        search={{ input: search, set: setSearch, text: "Search Chat" }}
        chat={{
          isChat: true,
          current: chat,
          setCurrent: setChat,
          chats: groups,
        }}
      >
        <div className="panelView cover d-flex col justify-center align-center">
          {chat ? (
            <Chat groupID={{ id: chat }} />
          ) : (
            <span>Select a chat from the left</span>
          )}
        </div>
      </PageContainer>
    </>
  );
}
