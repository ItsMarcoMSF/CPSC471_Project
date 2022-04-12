import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfileFriendList from "../ProfileFriendList/ProfileFriendList";
import AddFriend from "../AddFriend/AddFriend";

import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({});
  const [profileLoaded, setProfileLoaded] = useState(false);

  const [friends, setFriends] = useState([]);

  const [showLanguage, setShowLanguage] = useState(false);
  const [language, setLanguage] = useState("");

  const [addFriend, setAddFriend] = useState(false);

  const loadFriends = async () => {
    const payload = {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    try {
      const res = await fetch(`http://localhost:5000/user/friends`, payload);
      const friends = await res.json();
      setFriends(friends);
    } catch (err) {
      console.log(err);
    }
  };

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
      loadFriends();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newLanguage = {
      language: language,
    };
    const payload = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(newLanguage),
    };
    try {
      await fetch("http://localhost:5000/user/languages", payload);

      setLanguage("");
      loadProfile();
      setShowLanguage(false);
    } catch (err) {
      console.log(err);
    }
  };

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
        {/* <p>
          Password:
          <button>Change Password</button>
        </p> */}

        <div>
          <p>
            Languages:
            <span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowLanguage(!showLanguage);
                }}
              >
                Add Languages
              </button>
            </span>
          </p>

          {showLanguage && (
            <div className="language-form">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
              >
                <input
                  type="text"
                  value={language}
                  onChange={(e) => {
                    e.preventDefault();
                    setLanguage(e.target.value);
                  }}
                  placeholder="Enter a Language to add"
                />

                <button
                  type="button"
                  className="language-close-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowLanguage(false);
                  }}
                >
                  x
                </button>
              </form>
            </div>
          )}

          {userProfile.languages.length > 0 ? (
            <p className="languages-list">{userProfile.languages.join(", ")}</p>
          ) : (
            <p className="languages-list">No Languages Set</p>
          )}
        </div>
      </div>
      <div className="friends-list">
        <div className="friend-header">
          <h3>Friends List</h3>
          <button
            className="add-btn"
            onClick={(e) => {
              e.preventDefault();
              setAddFriend(true);
            }}
          >
            Add Friend +
          </button>
        </div>
        <hr />
        <div className="friend-body">
          <ProfileFriendList friends={friends} />
        </div>
      </div>
      {addFriend && (
        <AddFriend setAddFriend={setAddFriend} refreshProfile={loadProfile} />
      )}
    </div>
  ) : null;
};

export default Profile;
