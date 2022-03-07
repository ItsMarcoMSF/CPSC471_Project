import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');

  useEffect(() => {
    fetch("http://localhost:5000/isUserAuth", {
      headers: {
          "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => data.isLoggedIn ? setUsername(data.username) : navigate("/login"))
  })

  return (
    <div>
      <h2>Profile</h2>
      <p>Your Username is { username }</p>
    </div>
    
  )
}

export default Profile