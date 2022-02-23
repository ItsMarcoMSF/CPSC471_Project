import express from "express";

import { createBugs } from "../controllers/createBugs.js";
import { createProjects } from "../controllers/createProjects.js";
import { getBugsByID } from "../controllers/getBugsByID.js";

const router = express.Router();

router.post("/bugs", createBugs);
router.post("/projects", createProjects);
router.get("/bugs/:bugID", getBugsByID);

export default router;
