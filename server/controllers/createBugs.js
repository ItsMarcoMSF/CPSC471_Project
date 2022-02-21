import express from "express";
import mongoose from "mongoose";

import Bugs from "../models/bugs.js";

const router = express.Router();

export const createBugs = async (request, response) => {
  console.log(request.body);
  const { id, name, description, priority, status, deadline } = request.body;

  const newBug = new Bugs({
    id,
    name,
    description,
    priority,
    status,
    deadline,
  });

  try {
    await newBug.save();

    response.status(201).json(newBug);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

export default router;
