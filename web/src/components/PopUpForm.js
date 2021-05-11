import closeImg from "../assets/cross.svg";

/**
 * Function that creates a popup form for a user to input
 * information regarding preferences of a group to create
 * or search for.
 *
 * @param props must contain:
 *  onChange: function to call when popup form is submitted
 *  maxGroupSize: constant for maximum group size
 *  action: value to display on the submit button
 */
export default function PopUpForm(props) {
  function outside(e) {
    if (e.target.classList.contains("popUpOverlay")) {
      props.close();
    }
  }
  return (
    <>
      <div
        className="popUpOverlay container-full d-flex justify-center align-center"
        onClick={outside}
      >
        <div className="popUpBox d-flex justify-center align-center col">
          <img
            className="close"
            src={closeImg}
            alt="close"
            onClick={props.close}
          />
          {props.children}
          <button className="btnPrimaryFill" onClick={props.onSubmit}>
            {props.btnText}
          </button>
        </div>
      </div>
    </>
  );
}
