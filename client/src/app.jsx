import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import dotEnv from 'dotenv';
import { HomePage } from './pages';

function App() {
  dotEnv.config();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage minutes={1} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
