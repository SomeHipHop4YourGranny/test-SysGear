/* eslint-disable camelcase */
import React, { useState } from 'react';
import { Input, Output } from '../../components';
import { Converter } from '../../utils';

function Task1Container() {
  const [res = '', setRes] = useState();

  function start(val, unit, convertTo) {
    const data = Converter(val, unit, convertTo);
    setRes(data);
  }
  function handleInput(input) {
    try {
      const { distance, convert_to } = JSON.parse(input);
      start(distance.value, distance.unit, convert_to);
    } catch {
      const data = 'invalid data';
      setRes(data);
    }
  }

  return (
    <div>
      <Input
        handleInput={handleInput}
        defaultInput='{"distance": {"unit": "m", "value": 1}, "convert_to": "ft"}'
      />
      {res && res !== undefined ? <Output out={res} /> : false}
    </div>
  );
}

export default Task1Container;
