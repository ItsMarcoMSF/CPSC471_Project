import express from "express";
import jwt from "jsonwebtoken";

import {
  login,
  registerUser,
  getAccountsInfo,
  find,
  addFriend,
  addLanguage,
  getAllFriends,
} from "../controllers/userService.js";

import {
  createBugs,
  getBugsByID,
  getBugs,
  deleteBug,
  markResolved,
} from "../controllers/bugService.js";

import {
  createProjects,
  getProjects,
  deleteProject,
  addTask,
  deleteTask,
  addDeveloperToProject,
  addManagerToProject,
  getProjectDetail,
} from "../controllers/projectService.js";

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
router.patch("/user/languages", verifyJWTRequired, addLanguage);
router.get("/user/friends", verifyJWTRequired, getAllFriends);
router.get("/isUserAuth", verifyJWTRequired, (req, res) => {
  res.json({ isLoggedIn: true, username: req.user.username });
});

router.post("/bugs", verifyJWTRequired, createBugs);
router.get("/bugs/:bugID", verifyJWTRequired, getBugsByID);
router.get("/projects/:projectID/bugs", verifyJWTRequired, getBugs);
router.patch("/bugs/:bugID", verifyJWTRequired, markResolved);
router.delete("/bugs/:bugID", verifyJWTRequired, deleteBug);

router.get("/projects", verifyJWTRequired, getProjects);
router.post("/projects", verifyJWTRequired, createProjects);
router.delete("/projects/:projectID", verifyJWTRequired, deleteProject);
router.post("/projects/:projectID/tasks", verifyJWTRequired, addTask);
router.delete("/tasks/:taskID", verifyJWTRequired, deleteTask);
router.patch(
  "/projects/:projectID/developers",
  verifyJWTRequired,
  addDeveloperToProject
);
router.patch(
  "/projects/:projectID/managers",
  verifyJWTRequired,
  addManagerToProject
);
router.get("/projects/:projectID", verifyJWTRequired, getProjectDetail);

export default router;
