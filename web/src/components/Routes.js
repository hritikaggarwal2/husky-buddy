import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// user provider
import { useUser } from "../providers/UserProvider";

// screens
import Dashboard from "../screens/Dashboard";
import Login from "../screens/Login";
import NewUser from "../screens/NewUser";
import Loading from "../screens/Loading";

// firebase
import firebase from "firebase/app";
import "firebase/firestore";

// class for data processing
import { UserClassConverter } from "../data/UserClass";

export default function Routes() {
  const user = useUser().user;
  const load = useUser().load;

  const db = firebase.firestore();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (user !== null) {
      console.log(user.email);

      //   db.collection("users")
      //     .doc(user.uid)
      //     .withConverter(UserClassConverter)
      //     .onSnapshot(
      //       (snapshot) => {
      //         setData(snapshot.data());
      //       },
      //       (error) => {
      //         console.log("Error getting document:", error);
      //       }
      //     );
    }

    return () => {};
  }, [user]);

  return (
    <>
      {!load || (user != null && data === null) ? (
        <Loading />
      ) : (
        <Router>
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/search">
              <Dashboard />
            </Route>
            {/* To add your own screen follow the example below  */}
            <Route path="/template">
              {/* ADD your own screen component here */}
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/newUser">
              <NewUser />
            </Route>
          </Switch>
        </Router>
      )}
    </>
  );
}
