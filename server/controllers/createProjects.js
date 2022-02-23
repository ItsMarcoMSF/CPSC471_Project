import Projects from "../models/projects.js";

export const createProjects = async (request, response) => {
  console.log(request.body);
  const {
    id,
    name,
    start_date,
    deadline,
    category,
    bugs,
    manager,
    developers,
  } = request.body;
  const newProject = new Projects({
    id,
    name,
    start_date,
    deadline,
    category,
    bugs,
    manager,
    developers,
  });

  try {
    await newProject.save();

    response.status(201).json(newProject);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};
