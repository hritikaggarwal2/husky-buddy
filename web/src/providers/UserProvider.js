import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { UserClass, UserClassConverter } from "../data/UserClass";

const UserContext = createContext();

export function useUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}

export function createHuskyUser(firebaseUser, displayName) {
  console.log("Creating husky user with UID " + firebaseUser.uid);
  let uid = firebaseUser.uid;
  let huskyUserRef = firebase.firestore().collection("Users").doc(uid);

  const newUserObj = new UserClass(
    displayName,
    firebaseUser.email === null ? "" : firebaseUser.email,
    "", // DOB
    [], // groups
    "", // phone
    new Date(), // creation date
    "Hello World!", // status
    "", // image
    "", // major
    "", // about
    "" // uwid
  );

  huskyUserRef
    .set(UserClassConverter.toFirestore(newUserObj), { merge: true })
    .then((result) => {
      console.log("created user successfully");
    })
    .catch((error) => {
      console.log("Error creating user: " + error.code + ": " + error.message);
      alert("Error creating user! Please try again.");
    });
}

async function getHuskyUserFromFirebaseUser(firebaseUser) {
  if (firebaseUser === null) {
    return null;
  }

  console.log("react user uid:" + firebaseUser.uid);

  let huskyUserRef = firebase
    .firestore()
    .collection("Users")
    .doc(firebaseUser.uid);

  const huskyUserSnapshot = await huskyUserRef.get();
  if (!huskyUserSnapshot.exists) {
    console.log("Husky user does not exist, creating..");
    await createHuskyUser(firebaseUser, firebaseUser.email);
  }
  console.log("data: " + huskyUserSnapshot.data());
  return UserClassConverter.fromFirestore(huskyUserSnapshot, null);
}

export default function UserProvider(props) {
  const [user, setUser] = useState(firebase.auth().currentUser);
  const [huskyUser, setHuskyUser] = React.useState();
  const [load, setLoad] = React.useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((userAuth) => {
      setUser(userAuth);
      getHuskyUserFromFirebaseUser(userAuth).then((huskyUser) => {
        setHuskyUser(huskyUser);
        console.log("husky user: ");
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
