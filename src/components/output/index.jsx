import React from 'react';
import './output.scss';

function Output(props) {
  const { out } = props;

  return (
    <div className="output">
      <h2>Output</h2>
      <textarea
        name="output"
        id="output"
        cols="30"
        rows="10 "
        readOnly
        value={JSON.stringify(out)}
      />
    </div>
  );
}

export default Output;
