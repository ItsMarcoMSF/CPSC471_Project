import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({});
  const [profileLoaded, setProfileLoaded] = useState(false);

  const loadProfile = async () => {
    const payload = {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    try {
      const res = await fetch(`http://localhost:5000/user/self`, payload);
      const profile = await res.json();
      setUserProfile(profile);
      setProfileLoaded(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const userAuth = () => {
      fetch("http://localhost:5000/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => (data.isLoggedIn ? null : navigate("/login")));
    };
    userAuth();
  });

  useEffect(() => {
    loadProfile();
  }, []);

  return profileLoaded ? (
    <div className="profile-page-wrapper">
      <h2>Profile</h2>
      <button className="goback-btn" onClick={() => navigate("/dashboard")}>
        &lt; back
      </button>
      <div className="summary">
        <h3>Profile Summary</h3>
        <hr />
        <p>
          Username: <span>{userProfile.username}</span>
        </p>
        <p>
          Email: <span>{userProfile.email}</span>
        </p>
        <p>
          Password:
          <button>Change Password</button>
        </p>

        <div>
          <p>
            Languages:
            <span>
              <button>Add Languages</button>
            </span>
          </p>
          {userProfile.languages.length > 0 && (
            <p className="languages-list">{userProfile.languages.join(", ")}</p>
          )}
        </div>
      </div>
      <div className="friends-list">
        <div className="friend-header">
          <h3>Friends List</h3>
          <button className="add-btn">Add Friend +</button>
        </div>
        <hr />
        <div className="friend-body">
          <p>Marco Truong</p>
          <p>Marco Truong</p>
          <p>Marco Truong</p>
        </div>
      </div>
    </div>
  ) : null;
};

export default Profile;
