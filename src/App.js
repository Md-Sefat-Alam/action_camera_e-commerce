import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Nav from "./components/shared/Nav/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav></Nav>
      </div>
      <Switch>
        <Route exact path={"/"}>
          <Home></Home>
        </Route>
        <Route path={"/home"}>
          <Home></Home>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
