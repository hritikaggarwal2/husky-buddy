import { fireEvent, render, waitFor } from "@testing-library/react";
import firebase from "firebase/app";
//import { render, screen } from "@testing-library/react";
//import App from "./App";
//import Logout from "./components/Logout";
import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import firebaseConfig from "./config/Firebase";
import Login from "./screens/Login";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

afterAll(() => {
  firebase.app().delete();
});

firebase.initializeApp(firebaseConfig);

describe.only("Login Test", () => {
  jest.setTimeout(10000);

  it("Renders Login Screen", () => {
    const { getByText, getByPlaceholderText } = render(
      <BrowserRouter>
        {" "}
        <Login />{" "}
      </BrowserRouter>
    );

    getByText("Sign In");
    getByPlaceholderText("Enter Email");
    getByPlaceholderText("Enter Password");
  });

  it("Test User Inputting values on login screen", async () => {
    const loggedIn = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <BrowserRouter>
        <Login />
        <Switch>
          <Route path="/">{loggedIn}</Route>
        </Switch>
      </BrowserRouter>
    );

    const inputUsername = getByPlaceholderText("Enter Email");
    const inputPassword = getByPlaceholderText("Enter Password");
    fireEvent.change(inputUsername, {
      target: { value: "tuesdayuser@uw.edu" },
    });
    fireEvent.change(inputPassword, { target: { value: "wrongpassword" } });
    fireEvent.click(getByText("Sign In"));

    await waitFor(() => expect(loggedIn).toHaveBeenCalledTimes(1));

    // Lines below are for reference only:
    //expect(await findByText(container, 'Welcome Couch Potato')).toBeVisible();
    //expect(await container.toHaveTextContent('Welcome Couch Potato', {}, { timeout: 10000})).toBeInTheDocument();
    //expect(container).toHaveTextContent('Welcome Couch Potato');
    //expect(await screen.findByText('Welcome Couch Potato', {}, { timeout: 10000})).toBeInTheDocument();
  });
});
