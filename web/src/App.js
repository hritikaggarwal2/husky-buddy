import "./styles/common.scss";

// firebase stuff
import firebase from "firebase/app";
import firebaseConfig from "./config/Firebase";

// providers
import UserProvider from "./providers/UserProvider";

// components
import Routes from "./components/Routes";

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
}
