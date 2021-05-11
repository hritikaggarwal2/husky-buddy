import { useEffect, useState } from "react";
import "../styles/common.scss";
import "../components/MyGroupPanel";
import Chat from "../components/Chat";
import { useUser } from "../providers/UserProvider";
import { useLocation, useHistory } from "react-router-dom";

/**
 *
 * @param props must contain
 *      -groupID: the groupId stored in Firebase to which
 *                  the chat belongs.
 */
export default function PanelView(props) {
  const user = useUser().user;
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.state.group === undefined) {
      history.push({
        pathname: "/",
      });
    }
  }, [location.state.group, history]);

  return (
    <>
      {/* MAIN DASHBOARD VIEW */}
      <div className="panelView container d-flex col justify-center align-center">
        <h1 className="title">HuskyBuddy.</h1>
        <h2>Welcome, {user.display_name}</h2>
        <Chat groupID={location.state.group} />
      </div>
    </>
  );
}

//<Chat {props.groupID} />
