import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Explore from "./components/Explore/Explore";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
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
        <Route path={"/explore"}>
          <Explore></Explore>
        </Route>
        <Route path={"/login"}>
          <Login></Login>
        </Route>
        <Route path={"/register"}>
          <Register></Register>
        </Route>
      </Switch>
      <div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
