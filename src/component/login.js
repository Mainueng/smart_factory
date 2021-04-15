import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import login_img from "../image/login-img.png";
import user_icon from "../image/user-icon.png";
import password_icon from "../image/password-icon.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { login } = require("../controller/functions");

  let history = useHistory();

  useEffect(() => {
    if (localStorage.usertoken) {
      return history.push("/summary_outdoor");
    }
  }, [history]);

  const input_change = (e) => {
    setError(false);

    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const submit = (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    login(user)
      .then((res) => {
        if (res) {
          if (localStorage.login_error) {
            setError("Login failed. Invalid username or password.");
          } else {
            localStorage.removeItem("login_error");
            localStorage.setItem("usertoken", res.token);
            history.push("/summary_outdoor");
          }
        } else {
          setError("Login failed. Invalid username or password.");
        }
      })
      .catch((err) => {
        setError("Login failed.");
      });
  };

  return (
    <div className="login-container h-100">
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-6 d-flex">
            <div>
              <h1>SMART</h1>
              <h1>PRODUCTION</h1>
              <h2>SAIJO DENKI INTERNATIONAL CO.,LTD</h2>
            </div>
          </div>
          <div className="col-6 d-flex">
            <div className="w-100">
              <div className="text-center">
                <img
                  src={login_img}
                  alt="login-img"
                  className="img-fluid mb-5"
                />
              </div>
              <div className="d-flex mt-3">
                <div className="p-relative w-75 login-input">
                  <img
                    src={user_icon}
                    alt="user-icon"
                    className="img-fluid login-icon"
                  />
                  <input
                    type="text"
                    name="username"
                    placeholder="Employee ID"
                    className="w-100 text-center"
                    value={username}
                    onChange={input_change}
                    autoComplete="off"
                  />
                </div>
              </div>
              <form onSubmit={submit}>
                <div className="mt-4 d-flex ">
                  <div className="p-relative w-75 login-input">
                    <img
                      src={password_icon}
                      alt="password-icon"
                      className="img-fluid login-icon"
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="PASSWORD"
                      className="w-100 text-center"
                      value={password}
                      onChange={input_change}
                    />
                  </div>
                </div>
                <div className={error ? "mt-2 d-flex" : "mt-2 d-none"}>
                  <div className="login-error w-75">
                    <p className="mb-0">{error}</p>
                  </div>
                </div>
                <div className="text-center pt-4">
                  <button type="submit" className="login-btn my-2 px-4">
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
