import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Resizable from './widgets/Resizable'
import Nano from './components/nano/Nano';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

function Responsive({ width = window.innerWidth }) {
  return (
    (width <= 320)
      ? <Nano />
      : <Router>
        <Switch>
          <Route path="/:network?">
            <App />
          </Route>
        </Switch>
      </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Resizable>
      <Responsive />
    </Resizable>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
