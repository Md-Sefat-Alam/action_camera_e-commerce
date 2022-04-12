import { Button, Container, Input, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  return (
    <div className="pageRoot loginPageRoot">
      <Container maxWidth="lg">
        <div
          style={{ minHeight: "70vh" }}
          className="flex flex-col justify-center items-center"
        >
          <div>
            <h4 className="text-2xl font-bold text-gray-900 py-2 font-serif">
              Login
            </h4>
          </div>
          <div>
            <form className="">
              <div>
                <Input
                  className="font-serif"
                  placeholder="Email"
                  type="email"
                  required
                  inputProps={""}
                />
              </div>
              <div>
                <Input
                  className="font-serif"
                  type="password"
                  required
                  placeholder="Password"
                  inputProps={""}
                />
              </div>
              <div className="py-5">
                <Button type="submit" size="small" variant="outlined">
                  Login
                </Button>
              </div>
              <div className="py-2">
                <p className="text-sm text-gray-500">
                  You have no account?{" "}
                  <Link className="text-red-300 underline" to={"/register"}>
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
