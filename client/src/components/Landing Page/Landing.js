import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
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
    <div>
      <h1>Bug Tracker</h1>
      <h2>Landing Page</h2>
      <p>This project is a simple bug tracker with some additional features such as progess tracking. To view more detail, feel free to have a try by click the log in button below</p>
      <button><a href="./login">Click here to log in</a></button>
    </div>
  );
};

export default Landing;
