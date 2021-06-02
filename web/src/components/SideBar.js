// Node Modules
import { Link } from "react-router-dom";

export default function SideBar(props) {
  return (
    <div className="sidebar">
      <h1 className="profile d-flex justify-center align-center">
        HuskyBuddy.
      </h1>
      {!props.chat.isChat ? (
        <ul>
          {/* FOR MAINMENU */}
          <Link to="/">
            <li className={props?.index === 0 ? "active" : ""}>Dashboard</li>
          </Link>

          <Link to="/panelview">
            <li className={props?.index === 1 ? "active" : ""}>Chats</li>
          </Link>

          <Link to="/profile">
            <li className={props?.index === 2 ? "active" : ""}>Profile</li>
          </Link>

          <Link to="/logout">
            <li>Logout</li>
          </Link>
        </ul>
      ) : (
        <ul>
          {/* FOR CHATS */}
          <Link to="/">
            <li>Back to Home</li>
          </Link>

          {props.chat.chats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => props.chat.setCurrent(chat.id)}
              className={props.chat.current === chat.id ? "active" : ""}
            >
              {chat.group_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
