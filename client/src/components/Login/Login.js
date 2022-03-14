import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      setFailed(false);
      window.location.href = "/dashboard";
    } else {
      setFailed(true);
    }
  };

  useEffect(() => {
    const checkLoggedIn = () => {
      fetch("http://localhost:5000/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => (data.isLoggedIn ? navigate("/dashboard") : null));
    };
    checkLoggedIn();
  });

  return (
    <div className="login-wrapper">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <p>Username</p>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <p>Password</p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <br />
        <input className="button" type="submit" value="Log in" />
      </form>
      {failed && <p>Entered wrong username or password</p>}
      <div className="signup">
        <p>Don't have an account yet?</p>
        <Link className="signupLink" to="/register">Sign up</Link>
      </div>
    </div>
  );
};

export default Login;
