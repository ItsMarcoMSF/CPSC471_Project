import React from "react";

import "./ProfileFriendList.css";

const ProfileFriendList = ({ friends }) => {
  return (
    <div>
      {friends &&
        friends.map((friend) => (
          <div className="friend-card">
            <h4>{friend.username}</h4>
            <p>{friend.email}</p>
          </div>
        ))}
    </div>
  );
};

export default ProfileFriendList;
