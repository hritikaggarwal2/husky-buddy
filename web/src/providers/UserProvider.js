import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { UserClassConverter } from "../data/UserClass";

const UserContext = createContext();

export function useUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}

async function getHuskyUserFromReactUser(reactUser) {
  console.log("react user uid:" + reactUser.uid);

  let huskyUserRef = firebase
    .firestore()
    .collection("Users")
    .doc(reactUser.uid);

  const huskyUser = await huskyUserRef.get();
  return huskyUser.data();
}

export default function UserProvider(props) {
  const [user, setUser] = useState(firebase.auth().currentUser);
  const [huskyUser, setHuskyUser] = React.useState();
  const [load, setLoad] = React.useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((userAuth) => {
      setUser(userAuth);
      getHuskyUserFromReactUser(userAuth).then((huskyUser) => {
        setHuskyUser(huskyUser);
        console.log("husky user:");
        console.log(huskyUser);
      });

      setLoad(true);
    });

    return () => {
      console.log("terminating...");
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, load, huskyUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
