import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import DashboardMain from "./components/Dashboard/UserDashboard/DashboardMain/DashboardMain";
import Explore from "./components/Explore/Explore";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Register from "./components/Register/Register";
import Footer from "./components/shared/Footer/Footer";
import Nav from "./components/shared/Nav/Nav";
import AllProvider from "./contexts/AllProviders/AllProvider";
import Toolbar from "@mui/material/Toolbar";

function App() {
  return (
    <AllProvider>
      <Router>
        <div>
          <Nav></Nav>
          <Toolbar />
        </div>
        <Switch>
          <Route exact path={"/"}>
            <Home></Home>
          </Route>
          <Route path={"/home"}>
            <Home></Home>
          </Route>
          <PrivateRoute path={"/explore"}>
            <Explore></Explore>
          </PrivateRoute>
          <PrivateRoute path={"/dashboard"}>
            <DashboardMain />
          </PrivateRoute>
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
    </AllProvider>
  );
}

export default App;
