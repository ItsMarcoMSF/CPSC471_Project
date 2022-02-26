import express from "express";
import mongoose from "mongoose";

import Projects from "../models/projects.js";

const router = express.Router();

export const getProjects = async (request, response) => {
  try {

    const projID = request.params.projectID.replace(":", "");
    const projectMessages = await Projects.findById(projID);

    response.status(200).json(projectMessages);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export default router;
