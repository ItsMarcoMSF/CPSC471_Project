import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './Register.css'

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
      e.preventDefault()

      const form = e.target;
      const user = {
          username: form[0].value,
          email: form[1].value,
          password: form[2].value,
      }

      fetch("http://localhost:5000/register", {
          method: "POST",
          headers: {
              "Content-type": "application/json"
          },
          body: JSON.stringify(user)
      })
  }

  useEffect(() => {
    fetch("http://localhost:5000/isUserAuth", {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    })
    .then(res => res.json())
    .then(data => data.isLoggedIn ? navigate("/dashboard") : null)
  }, [])

  return (
    <form onSubmit={event => handleRegister(event)}>
        <input required type="text" />
        <input required type="email" />
        <input required type="password" />
        <input type="submit" value="Register" />
    </form>
  )
}

export default Register