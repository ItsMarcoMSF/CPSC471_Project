import express from "express";

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

router.post("/bugs", createBugs);
router.get("/bugs/:bugID", getBugsByID);
router.get("/bugs", getAllBugs);
router.get("/projects/:projectID/bugs", getBugsByPrjID);

router.get("/:userID/projects", getProjects);
router.post("/projects", createProjects);
router.delete("/:userID/projects/:projectID", deleteProject);
router.get("/:userID/projects/:id", getProjectByID);

export default router;
