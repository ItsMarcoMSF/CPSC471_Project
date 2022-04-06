import React, { useState } from "react";

import "./AddFriend.css";

const AddFriend = ({ setAddFriend, refreshProfile }) => {
  const [user, setUser] = useState({});
  const [searchValue, setSearchValue] = useState("");

  const search = async (e) => {
    e.preventDefault();
    const payload = {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    try {
      const res = await fetch(
        `http://localhost:5000/user/?search=${searchValue}`,
        payload
      );
      const user = await res.json();
      if (user) {
        setUser(user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addFriend = async (e) => {
    e.preventDefault();
    const payload = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        friendID: user._id,
      }),
    };

    try {
      await fetch(`http://localhost:5000/user`, payload);
      setAddFriend(false);
      refreshProfile();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-friend-box">
      <div className="add-friend-content">
        <div className="search-box">
          <form onSubmit={(e) => search(e)}>
            <label htmlFor="searchValue">Search for a user</label>
            <input
              type="text"
              placeholder="enter username or email"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        {user.username ? (
          <div className="add-friend-card">
            <div>
              <h4>Found user: {user.username}</h4>
              <p>{user.email}</p>
            </div>
            <button type="button" onClick={(e) => addFriend(e)}>
              Add User
            </button>
          </div>
        ) : null}
        <button
          className="add-close-btn"
          onClick={(e) => {
            e.preventDefault();
            setAddFriend(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddFriend;
