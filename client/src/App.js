import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Landing from "./components/Landing Page/Landing";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";

const App = () => {
  //   const [token, setToken] = useState();

  //   if (!token) {
  //     return <Login setToken={setToken} />;
  //   }

  return (
    <div className="wrapper">
      <h1>Bug Tracker</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
