import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { HomePage } from './pages';
import { BreakpointProvider } from './hooks';

function App() {
  return (
    <BreakpointProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </BreakpointProvider>
  );
}

export default App;
