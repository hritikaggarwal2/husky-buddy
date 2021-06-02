import { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { UserClassConverter } from "../data/UserClass";

const UserContext = createContext();

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}

export default function UserProvider(props) {
  const [user, setUser] = useState();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    console.log("mounted");
    let unsubscribeInner = null;
    const unsubscribeOuter = firebase.auth().onAuthStateChanged((userAuth) => {
      console.log("onauthstatechanged");
      if (userAuth === null) {
        setUser(null);
        setLoad(false);
        return;
      }

      unsubscribeInner = firebase
        .firestore()
        .collection("Users")
        .doc(userAuth.uid)
        .withConverter(UserClassConverter)
        .onSnapshot(
          {
            // Listen for document metadata changes
            includeMetadataChanges: true,
          },
          (snapshot) => {
            let updateUser = snapshot.data();
            updateUser.uwid = userAuth.uid;
            setUser(updateUser);

            setLoad(false);
          }
        );
    });

    return () => {
      console.log("terminating...");
      unsubscribeOuter();
      if (unsubscribeInner) {
        unsubscribeInner();
      }
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, load }}>
      {props.children}
    </UserContext.Provider>
  );
}
