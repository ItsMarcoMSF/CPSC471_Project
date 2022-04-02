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
// dotenv.config({path:'server/.env'});
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors());

// var jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const User = require("./models/user.js")

app.use("/", Routes);

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
