import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "./models/user.js";
// import "dotenv/config";

import Routes from "./routes/bugs.js";

const app = express();
dotenv.config({path:'server/.env'});

app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors());

// var jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const User = require("./models/user.js")


function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"]?.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res.json({
          isLoggedIn: false,
          message: "Failed To Authenticate",
        });
      req.user = {};
      req.user.id = decoded.id;
      req.user.username = decoded.username;
      next();
    });
  } else {
    res.json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
}

app.use("/", Routes);
// app.use("/login", (request, response) => {
//   response.send({
//     token: "test123",
//   });
// });

app.post("/register", async (req, res) => {
  const user = req.body;

  const takenUsername = await User.findOne({ username: user.username });
  const takenEmail = await User.findOne({ email: user.email });

  if (takenUsername || takenEmail) {
    res.json({ message: "Username or email has already been taken" });
  } else {
    user.password = await bcrypt.hash(req.body.password, 10);

    const dbUser = new User({
      username: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.password,
    });

    dbUser.save();
    res.json({ message: "Success" });
  }
});

app.post("/login", (req, res) => {
  const userLoggingIn = req.body;

  User.findOne({ username: userLoggingIn.username }).then((dbUser) => {
    if (!dbUser) {
      return res.json({ message: "Invalid Username or Password" });
    }
    bcrypt
      .compare(userLoggingIn.password, dbUser.password)
      .then((isCorrect) => {
        if (isCorrect) {
          const payload = {
            id: dbUser._id,
            username: dbUser.username,
          };
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 86400 },
            (err, token) => {
              if (err) return res.json({ message: "err" });
              return res.json({
                message: "Success",
                token: "Bearer " + token,
              });
            }
          );
        } else {
          return res.json({ message: "Invalid Username or Password" });
        }
      });
  });
});

app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.json({ isLoggedIn: true, username: req.user.username });
});

//console.log(process.env.CONNECTION_URL);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
