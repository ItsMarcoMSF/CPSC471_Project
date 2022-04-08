import React from "react";

import "./AddDevFriends.css";

const AddDevFriends = ({friends})=>{
    return(
        <div>
            {friends && friends.map((friend)=>(
                <div>
                    <option value={friend._id}>{friend.username}</option>
                </div>
            ))}
        </div>
    );
};

export default AddDevFriends;
/*
<select class="dev-dropdown" name="friends" id ="friends">
{getFriends.map((friend) => (
  <option value={friend.id}>{friend.name}</option>
))}
</select>*/