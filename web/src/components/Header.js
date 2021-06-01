// Node Modules
import { useRef } from "react";
import { Link } from "react-router-dom";

// Image Imports
import Notification from "../assets/notification.png";
import Search from "../assets/search.png";

export default function Header(props) {
  const inputRef = useRef();

  function onChange(e) {
    props.set(e.target.value);
  }

  function focus(e) {
    inputRef.current.focus();
  }

  return (
    <div className="header d-flex row justify-between align-center">
      <div
        className="search flex-grow d-flex align-center justify-center"
        onClick={focus}
      >
        <img alt="Search Icon" src={Search} />
        <input
          ref={inputRef}
          className="flex-grow"
          value={props.input}
          onChange={onChange}
          type="search"
          placeholder="Explore New Groups"
        />
      </div>

      <div className="d-flex row align-center">
        <Link to="/notifications">
          <div className="tooltip">
            {/* XXX hritik : CHANGE IMAGE */}
            <img alt="Notifications" src={Notification} />
            <span>Notifications</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
