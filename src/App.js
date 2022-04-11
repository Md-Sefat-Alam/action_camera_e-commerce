import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Footer from "./components/shared/Footer/Footer";
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
      <div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
