import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const login = (req, res) => {
  const userLoggingIn = req.body;
  try {
    if (!req.body.username || !req.body.password) {
      return res.sendStatus(404);
    }

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
                  username: dbUser.username,
                });
              }
            );
          } else {
            return res.json({ message: "Invalid Username or Password" });
          }
        });
    });
  } catch {
    res.sendStatus(404);
  }
};

export const registerUser = async (req, res) => {
  const user = req.body;
  try {
    const takenUsername = await User.findOne({ username: user.username });
    const takenEmail = await User.findOne({ email: user.email });
    if (!req.body.password) {
      return res.sendStatus(404);
    }
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
  } catch (e) {
    res.status(404).json({ message: e });
  }
};

export const getAccountsInfo = async (req, res) => {
  const userID = req.user.id;
  try {
    var result = await User.findById(userID);
    var trimmedResult = {
      username: result.username,
      email: result.email,
      languages: result.languages,
      projects: result.projects,
      friends: result.friends,
    };

    res.status(200).json(trimmedResult);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

export const find = async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  try {
    var result = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    const userBasic = {
      username: result.username,
      email: result.email,
      _id: result._id,
    };
    res.status(200).json(userBasic);
  } catch (err) {
    res.status(404).json({ message: "User Not Found" });
  }
};

export const addFriend = async (req, res) => {
  const userID = req.user.id;
  const friendID = req.body.friendID;
  try {
    var result = await User.updateOne(
      { _id: userID },
      {
        $addToSet: {
          friends: friendID,
        },
      }
    );
    res.status(201).send();
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

export const addLanguage = async (req, res) => {
  const userID = req.user.id;
  const language = req.body.language;
  try {
    await User.updateOne(
      { _id: userID },
      {
        $addToSet: {
          languages: language,
        },
      }
    );
    res.status(200).send();
  } catch (err) {
    res.status(404).json({ error: err });
  }
};
