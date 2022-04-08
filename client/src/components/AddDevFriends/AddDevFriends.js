import React from "react";

import "./AddDevFriends.css";

const AddDevFriends = ({friends}) =>{
    let options = [];
    for(let i = 0; i <friends.length; i++){
        console.log(friends[i].username);
        options.push(<option key={friends[i]._id} value={friends[i]._id}>{friends[i].username}</option>)
    }

    return options;
};

export default AddDevFriends;