import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './Login.css'

const Login = () => {
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();

        const form = e.target;
        const user = {
            username: form[0].value,
            password: form[1].value
        }

        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("token", data.token)
        })
        navigate("/dashboard");
    }

    useEffect(() => {
        const checkLoggedIn = async () => {
            await fetch("http://localhost:5000/isUserAuth", {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            })
            .then(res => res.json())
            .then(data => data.isLoggedIn ? navigate("/dashboard") : null)
        }
        checkLoggedIn();
    }, [])

  return (
    <div className="login-wrapper">
        <h1>Please Log In</h1>
        <form onSubmit={ e => handleLogin(e) }>
            <input required type="text" />
            <input required type="password" />
            <input type="submit" value="Submit" />
        </form>
    </div>
  )
}

export default Login