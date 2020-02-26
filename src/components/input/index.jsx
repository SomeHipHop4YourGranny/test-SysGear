import React, { useState } from 'react';
import './input.scss';

function Input(props) {
  const { handleInput, defaultInput } = props;

  const [input = '', setInput] = useState(defaultInput);

  function handleTextArea(e) {
    setInput(e.target.value);
  }

  function handleSubmit() {
    handleInput(input);
  }

  return (
    <div className="input">
      <h2>Input</h2>
      <textarea
        name="input"
        id="input"
        cols="30"
        rows="10 "
        onInput={handleTextArea}
        placeholder={defaultInput}
      />
      <br />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default Input;
