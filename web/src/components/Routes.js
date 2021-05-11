import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// user provider
import { useUser } from "../providers/UserProvider";

// components
import Logout from "../components/Logout";

// screens
import Dashboard from "../screens/Dashboard";
import Login from "../screens/Login";
import NewUser from "../screens/NewUser";
import Loading from "../screens/Loading";
import Landing from "../screens/Landing";
import PanelView from "../screens/PanelView";

// firebase
import firebase from "firebase/app";
import "firebase/firestore";

// class for data processing
import { UserClassConverter } from "../data/UserClass";

export default function Routes() {
  const firebaseUser = useUser().firebaseUser;
  const load = useUser().load;

  const db = firebase.firestore();

  useEffect(() => {
    if (firebaseUser !== null) {
      console.log(firebaseUser.email);
    }

    return () => {};
  }, [firebaseUser]);

  return (
    <>
      {!load || firebaseUser == null ? (
        <>
          <Loading />
        </>
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
            <Route path="/newuser">
              <NewUser />
            </Route>
            <Route path="/panelview">
              <PanelView />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/">
              <Landing />
            </Route>
          </Switch>
        </Router>
      )}
    </>
  );
}
