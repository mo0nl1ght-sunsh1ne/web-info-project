import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ReactCSSTransitionGroup from 'react-transition-group';

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();



  useEffect(() => {
    if (username.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [username, password]);

  const handleLogin = () => {
    const payload = {
      username: username,
      email: username,
      pwd: password
    };

    axios({
      method: "POST",
      url: "/login",
      data: payload
    })
      .then(function(response) {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log(localStorage);
          history.push("/dashboard");
        } else {
          console.log(response);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="form-container">
        <h1 className="login">Log In </h1>
      <br/>
      <div className="form">
        <br/> <br/> <br/>
        <br/>
        <div className="form-group">
          <label htmlFor="username"> User Name </label>
          <input
            type="text"
            className="form-control"
            name="username"
            id="username"
            placeholder="Enter User name"
            error={error}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Password"> Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            placeholder="Enter Password"
            error={error}
            helperText={helperText}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <br/>
        <div className="text-center">
          <button
            className="btn btn-primary btn-lg"
            onClick={handleLogin}
            disabled={isButtonDisabled}
          >
            Log In
          </button>
          <br/>

          <a href="./SignUp">
            <b> Create a new account</b>
          </a>
        </div>
        </div>
      </div>
      <br></br>
    </div>
  );
};