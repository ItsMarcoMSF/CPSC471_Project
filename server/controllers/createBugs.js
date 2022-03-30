import Bugs from "../models/bugs.js";
import Projects from "../models/projects.js";

export const createBugs = async (request, response) => {
  console.log(request.body);
  const { id, name, description, priority, status, deadline, prjID } =
    request.body;

  const newBug = new Bugs({
    id,
    name,
    description,
    priority,
    status,
    deadline,
    prjID,
  });

  try {
    await newBug.save();

    response.status(201).json(newBug);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};
