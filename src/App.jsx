import React from 'react';

import { Route, Switch, Link } from 'react-router-dom';
import { Task1Container, Task2Container, Task3Container } from './container';
import './App.scss';

function App() {
  return (
    <div className="App">
      <div>
        <Link to="/task1">task 1</Link>
        <Link to="/task2">task 2</Link>
        <Link to="/task3">task 3</Link>
      </div>
      <Switch>
        <Route exact path={['/', '/task1']} component={Task1Container} />
        <Route exact path="/task2" component={Task2Container} />
        <Route exact path="/task3" component={Task3Container} />
      </Switch>
    </div>
  );
}

export default App;
