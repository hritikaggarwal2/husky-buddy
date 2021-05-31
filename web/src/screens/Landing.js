// Node modules
import { Link } from "react-router-dom";

// Assets
import LandingImg from "../assets/landing.png";

export default function Landing(props) {
  return (
    <div className="landingPg landingTest">
      <header>
        <ul className="d-flex justify-end align-center">
          <Link className="supportTest" to="/support">
            <li className="support lightText">Support</li>
          </Link>
          <Link className="loginTest" to="/login">
            <li className="signIn primaryText">Sign In</li>
          </Link>
        </ul>
      </header>
      <div className="container d-flex justify-center align-center">
        <div>
          <h1 className="title">Husky Buddy.</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          <Link className="joinTest" to="/signup">
            <button className="btnPrimaryFill">Join the Community</button>
          </Link>
        </div>
        <img src={LandingImg} alt="Making Notes Landing Page" />
      </div>
    </div>
  );
}
