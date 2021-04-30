// Add Imports

/**
 * TODO @Thorne - Please add your code here.
 * Firebase user auth is super simple and can be easily implemented.
 * Google search "firebase auth" and you can find some easy ways to implement it.
 * A tricky thing here is to check if the user is a UW student or not. For this we can
 * always check if the email ends with '@uw.edu'. If you have some extra time, it would
 * be awesome to look how SAML 2 works and how we can incorporate that into our project.
 * Definitely a super stretch thing here, but you might find this interesting :)
 * Somethings I found out -
 *    https://www.npmjs.com/package/saml2-js
 *    https://medium.com/@tfalvo/single-sign-on-sso-for-your-firebase-app-with-saml-f67c71e0b4d6
 */
export default function Login() {
  return (
    <div className="Login">
      <header className="Login-header">
        <p>
          Edit <code>Login.js</code> and save to reload.
        </p>
        <a
          className="Login-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
