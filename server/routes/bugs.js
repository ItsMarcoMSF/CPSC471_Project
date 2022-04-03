import express from "express";
import jwt from "jsonwebtoken";

import {
  login,
  registerUser,
  getAccountsInfo,
  find,
  addFriend,
} from "../controllers/userService.js";

import { createBugs } from "../controllers/createBugs.js";
import { getBugsByID } from "../controllers/getBugsByID.js";
import { getAllBugs } from "../controllers/getAllBugs.js";
import {
  createProjects,
  getProjects,
  getProjectByID,
  deleteProject,
} from "../controllers/projectService.js";

import { getBugsByPrjID } from "../controllers/bugService.js";

const router = express.Router();

const verifyJWT = (req, res, next) => {
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
    req.user = {};
    req.user.username = "";
    next();
  }
};

const verifyJWTRequired = (req, res, next) => {
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
};

router.post("/register", registerUser);
router.post("/login", login);
router.get("/user/self", verifyJWTRequired, getAccountsInfo);
router.get("/user", verifyJWTRequired, find);
router.patch("/user", verifyJWTRequired, addFriend);
router.get("/isUserAuth", verifyJWTRequired, (req, res) => {
  res.json({ isLoggedIn: true, username: req.user.username });
});

router.post("/bugs", createBugs);
router.get("/bugs/:bugID", getBugsByID);
router.get("/bugs", getAllBugs);
router.get("/projects/:projectID/bugs", getBugsByPrjID);

router.get("/projects", verifyJWTRequired, getProjects);
router.post("/projects", verifyJWTRequired, createProjects);
router.delete("/:userID/projects/:projectID", deleteProject);
router.get("/:userID/projects/:id", getProjectByID);

export default router;
