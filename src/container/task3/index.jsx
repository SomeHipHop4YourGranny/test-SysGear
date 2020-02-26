import React, { useState } from 'react';
import { Input, Output } from '../../components';
import { Population } from '../../utils';

function Task3Container() {
  const [res = '', setRes] = useState();

  function start(target, popMax, mutationRate, cells) {
    const rocket = new Population(target, popMax, mutationRate, cells);
    const data = rocket.populate();
    setRes(data);
  }
  function handleInput(input) {
    try {
      const { target, cells } = JSON.parse(input);
      const popMax = 2000;
      const mutationRate = 0.01;
      start(target, popMax, mutationRate, cells);
    } catch {
      setRes('invalid data');
    }
  }

  return (
    <div>
      <Input
        handleInput={handleInput}
        defaultInput='{"target":[1,2,3,4],"cells":[1,2,3,4]}'
      />
      {res && res !== undefined ? <Output out={res} /> : false}
    </div>
  );
}

export default Task3Container;
