import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// user provider
import { useUser } from "../providers/UserProvider";

// components
import Logout from "../components/Logout";

// screens
import Dashboard from "../screens/Dashboard";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Loading from "../screens/Loading";
import Landing from "../screens/Landing";
import PanelView from "../screens/PanelView";

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
            <Route path="/search">
              <Dashboard />
            </Route>
            <Route path="/panelview">
              <PanelView />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>

            <Route path="/panelview">
              <PanelView />
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
