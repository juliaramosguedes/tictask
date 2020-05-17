import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import dotEnv from "dotenv";
import { HomePage } from "./pages";

function App() {
  dotEnv.config();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage minutes={1} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
