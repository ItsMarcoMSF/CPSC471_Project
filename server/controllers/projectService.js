import Projects from "../models/projects.js";

export const createProjects = async (req, res) => {
  const managerID = req.user.id;
  const { id, name, start_date, deadline, category, bugs, developers } =
    req.body;
  const newProject = new Projects({
    id,
    name,
    start_date,
    deadline,
    category,
    bugs,
    managers: managerID,
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
    const userID = req.user.id;
    const projects = await Projects.find({
      $or: [{ managers: userID }, { developers: userID }],
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(projects);
  } catch (error) {
    res.status(404).json({ message: "No projects found" });
  }
};

export const getProjectByID = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.params.userID;

    const project = await Projects.find({
      $and: [{ _id: id }, { $or: [{ manager: user }, { developers: user }] }],
    });

    if (project.length === 0) {
      res.status(404).json({ message: "Project Not Found or Invalid Access" });
    } else {
      res.status(200).json(project);
    }
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

/*
 * localhost:5000/projects/:projectID/users
 */
export const addDeveloperToProject = async (req, res) => {
  const projectID = req.params.projectID;
  const devID = req.body.devID;
  var result = await Projects.updateOne(
    { _id: projectID },
    {
      $addToSet: {
        [developers]: devID,
      },
    }
  );

  return res.status(200).send();
};

export const addManagerToProject = async (req, res) => {
  const projectID = req.params.projectID;
  const devID = req.body.devID;
  var result = await Projects.updateOne(
    { _id: projectID },
    {
      $addToSet: {
        [managers]: devID,
      },
    }
  );

  return res.status(200).send();
};
