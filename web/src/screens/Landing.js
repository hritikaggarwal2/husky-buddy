import "../styles/common.scss";
import LandingImg from "../assets/landing.png";

import { Link } from "react-router-dom";

export default function Landing(props) {
  return (
    <div className="landingPg">
      <header>
        <ul className="d-flex justify-end align-center">
          <li className="lightText">
            <Link to="/">Support</Link>
          </li>
          <li className="primaryText">
            <Link to="/login">Sign In</Link>
          </li>
        </ul>
      </header>
      <div className="container d-flex justify-center align-center">
        <div>
          <h1>Husky Buddy.</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          <Link to="/newuser">
            <button className="btnPrimaryFill">Join the Community</button>
          </Link>
        </div>
        <img src={LandingImg} alt="Making Notes Landing Page" />
      </div>
    </div>
  );
}
