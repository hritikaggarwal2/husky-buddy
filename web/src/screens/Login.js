// Add Imports

/**
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

// XXX tgarvin: potential XSS problems w/ using a strategy this simple
// but I don't think it's something to worry about a ton right now
export function getToken() {
  return sessionStorage.getItem('token');
}

export function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

/* User auth module */
export default function Login() {
  return (
    <div className="login">
      <header className="login-header">
        Login
      </header>
      <form className="login-form">
        <label>
          <p>E-Mail</p>
            <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input type="password"/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
