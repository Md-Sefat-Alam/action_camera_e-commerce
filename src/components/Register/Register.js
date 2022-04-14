import { Button, Container, Input } from "@mui/material";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Register = () => {
  const { emailpasswordRegister, setUser, setMessage, setError, setIsLoading } =
    useAuth();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const history = useHistory();
  const handleLoginData = (e, type) => {
    switch (type) {
      case "name":
        const tempData1 = { ...registerData };
        tempData1.name = e.target.value;
        setRegisterData(tempData1);
        break;
      case "email":
        const tempData2 = { ...registerData };
        tempData2.email = e.target.value;
        setRegisterData(tempData2);
        break;
      case "password":
        const tempData3 = { ...registerData };
        tempData3.password = e.target.value;
        setRegisterData(tempData3);
        break;
      default:
        break;
    }
  };
  const handleRegister = (e) => {
    e.preventDefault();
    emailpasswordRegister(registerData.email, registerData.password)
      .then((userCredential) => {
        history.push("/home");
        setUser(userCredential.user);
        axios
          .post("http://localhost:5000/register", {
            ...registerData,
            email: userCredential.user.email,
            role: "USER",
          })
          .then((res) => {});
        const text = `Welcome ${
          userCredential.user.displayName
            ? userCredential.user.displayName
            : userCredential.user.email
        } Successfully registered and Logedin`;
        setMessage(text);
      })
      .catch((error) => {
        setError(error.code);
      })
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
              Register
            </h4>
          </div>
          <div>
            <form className="">
              <div>
                <Input
                  className="font-serif text-gray-500"
                  placeholder="Name"
                  type="text"
                  required
                  inputProps={""}
                  onChange={(e) => handleLoginData(e, "name")}
                />
              </div>
              <div>
                <Input
                  className="font-serif text-gray-500"
                  placeholder="Email"
                  type="email"
                  required
                  inputProps={""}
                  onChange={(e) => handleLoginData(e, "email")}
                />
              </div>
              <div>
                <Input
                  className="font-serif text-gray-500"
                  type="password"
                  required
                  placeholder="Password"
                  inputProps={""}
                  onChange={(e) => handleLoginData(e, "password")}
                />
              </div>
              <div className="py-5">
                <Button
                  onClick={handleRegister}
                  type="submit"
                  size="small"
                  variant="outlined"
                >
                  Register
                </Button>
              </div>
              <div className="py-2">
                <p className="text-sm text-gray-500">
                  You have an account?{" "}
                  <Link className="text-red-300 underline" to={"/login"}>
                    Login
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

export default Register;
