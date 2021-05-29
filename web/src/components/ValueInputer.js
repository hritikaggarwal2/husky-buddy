import React, { useState } from "react";
import "../styles/common.scss";

/**
 * Function that displays an input field based
 * on parameters passed in to props.
 *
 * @param props must include:
 *      onChange: function to call when value is inputted
 *      type: the type of the input value
 */
export default function ValueInputer(props) {
  const [displayValue, setDisplayValue] = useState("");

  function onInputChange(event) {
    let input = event.target.value;
    setDisplayValue(input);
    props.onChange(input);
  }

  return (
    <div className="inputField d-flex row justify-between align-center">
      <input
        placeholder={props.title}
        className="inputComponent"
        {...props}
        value={displayValue}
        onChange={onInputChange}
      />
    </div>
  );
}
