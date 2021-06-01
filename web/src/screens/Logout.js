// Firebase
import firebase from "firebase/app";
import { useEffect } from "react";

// Components
import Loading from "./Loading";

export default function Logout() {
  useEffect(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("signout succeeded!");
        window.location.reload();
      })
      .catch((error) => {
        // XXX tgarvin: maybe surface this to the user somehow? not sure what errors this can throw
        // TODO: resolve this in a better way
        console.log("Signout failure: " + error.code + ": " + error.message);
      });
  }, []);
  return <Loading />;
}
