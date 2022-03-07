import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) =>
        data.isLoggedIn ? console.log(data.username) : navigate("/login")
      );
  });

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleProfile = (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button type="button" onClick={(e) => handleLogout(e)}>
        Log Out
      </button>
      <button type="button" onClick={(e) => handleProfile(e)}>
        Profile
      </button>
    </div>
  );
};

export default Dashboard;
