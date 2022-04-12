import { Button, Container, Input } from "@mui/material";
import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./Login.css";

const Login = () => {
  const { emailPasswordLogin, setUser, setMessage, setError, setIsLoading } =
    useAuth();
  const loginEmail = useRef();
  const loginPass = useRef();
  const history = useHistory();
  const location = useLocation();
  const path = location.state?.from || "/home";

  const handleLogin = (e) => {
    e.preventDefault();

    emailPasswordLogin(
      loginEmail.current.firstChild.value,
      loginPass.current.firstChild.value
    )
      .then((result) => {
        setUser(result.user);
        loginEmail.current.firstChild.value = "";
        loginPass.current.firstChild.value = "";
        const text = `Welcome ${
          result.user.displayName ? result.user.displayName : result.user.email
        } Successfully Logedin`;
        history.push(path);
        setMessage(text);
      })
      .catch((error) => setError(error.code))
      .finally(() => setIsLoading(false));
  };

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
            <form onSubmit={handleLogin} className="">
              <div>
                <Input
                  className="font-serif"
                  placeholder="Email"
                  type="email"
                  required
                  inputProps={""}
                  ref={loginEmail}
                />
              </div>
              <div>
                <Input
                  className="font-serif"
                  type="password"
                  required
                  placeholder="Password"
                  inputProps={""}
                  ref={loginPass}
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
