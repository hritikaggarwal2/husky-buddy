// Node Modules
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Firebase
import { useUser } from "../providers/UserProvider";

// Screens
import Logout from "../screens/Logout";
import Dashboard from "../screens/Dashboard";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Loading from "../screens/Loading";
import Landing from "../screens/Landing";
import PanelView from "../screens/PanelView";
import UserProfile from "../screens/UserProfile";

export default function Routes() {
  const user = useUser().user;
  const isLoading = useUser().load;

  return (
    <>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : user === null ? (
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/">
              <Landing />
            </Route>
          </Switch>
        </Router>
      ) : (
        <Router>
          <Switch>
            <Route path="/profile">
              <UserProfile />
            </Route>
            <Route path="/search">
              <Dashboard />
            </Route>
            <Route path="/panelview">
              <PanelView />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </Router>
      )}
    </>
  );
}
