import React, { useState } from 'react';
import { Input, Output } from '../../components';
import { FCNR } from '../../utils';

function Task2Container() {
  const [res = '', setRes] = useState();

  function start(container, input) {
    const data = FCNR(container, input);
    setRes(data);
  }
  function handleInput(input) {
    try {
      const { container, rect } = JSON.parse(input);

      start(container, rect);
    } catch {
      const data = 'invalid data';
      setRes(data);
    }
  }

  return (
    <div>
      <Input
        handleInput={handleInput}
        defaultInput='{"rect":[{"width":10,"height":20},{"width":10,"height":20},{"width":10,"height":20}],"container":{"width":100,"height":200}}'
      />
      {res && res !== undefined ? <Output out={res} /> : false}
    </div>
  );
}

export default Task2Container;
