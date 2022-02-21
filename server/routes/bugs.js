import express from "express";

import { createBugs } from "../controllers/createBugs.js";

const router = express.Router();

router.post("/", createBugs);

export default router;
