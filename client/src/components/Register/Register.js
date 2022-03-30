import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [taken, setTaken] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.message === "Success") {
      setTaken(false);
      navigate("/login");
    } else if (data.message === "Username or email has already been taken") {
      setTaken(true);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => (data.isLoggedIn ? navigate("/dashboard") : null));
  });

  return (
    <div className="register-wrapper">
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <p>Username</p>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <p>Email</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <p>Password</p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <br />
        <input className="register-button" type="submit" value="Register" />
      </form>
      {taken && <p>Username or email has already been taken</p>}

      <div className="login">
        <p>Already have an account?</p>
        <Link className="loginLink" to="/login">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Register;
