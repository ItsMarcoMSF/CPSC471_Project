import express from "express";

import { createBugs } from "../controllers/createBugs.js";
import { createProjects } from "../controllers/createProjects.js";
import { getBugsByID } from "../controllers/getBugsByID.js";
import { getProjects } from "../controllers/getProjects.js";
import { getAllBugs } from "../controllers/getAllBugs.js";

const router = express.Router();

router.post("/bugs", createBugs);
router.post("/projects", createProjects);
router.get("/bugs/:bugID", getBugsByID);
router.get("/projects/:projectID", getProjects);
router.get("/bugs", getAllBugs);

export default router;
