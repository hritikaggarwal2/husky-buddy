import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";

export const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider(props) {
  const [user, setUser] = useState(firebase.auth().currentUser);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((userAuth) => {
      setUser(userAuth);
      setLoad(true);
    });

    return () => {
      console.log("terminating...");
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, load }}>
      {props.children}
    </UserContext.Provider>
  );
}
