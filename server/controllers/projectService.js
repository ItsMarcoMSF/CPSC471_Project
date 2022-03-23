import Projects from "../models/projects.js";

export const createProjects = async (req, res) => {
  const {
    id,
    name,
    start_date,
    deadline,
    category,
    bugs,
    manager,
    developers,
  } = req.body;
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

    res.status(201).json(newProject);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const limit = 3;
    const page = req.query.page;
    const userID = req.params.userID;

    // const projects = await Projects.find({
    //   $or: [{ manager: userID }, { developer: userID }],
    // })
    const projects = await Projects.find({ manager: userID })
      .sort({ name: -1 })
      .limit(limit)
      .skip(page * limit);

    res.status(200).json(projects);
  } catch (error) {
    res.status(404).json({ message: "No projects found" });
  }
};

export const getProjectByID = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.params.userID;

    const project = await Projects.find(
      { _id: id },
      { $or: [{ manager: user }, { developer: user }] }
    );

    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: "Project Not Found" });
  }
};

export const editProjects = async (req, res) => {
  try {
    const project = req.body.project;
  } catch (error) {
    res.status(400).json({ message: "error editing the project" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const id = req.query.id;

    await Projects.findByIdAndDelete(id);

    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status.json({ message: "Could not delete" });
  }
};
