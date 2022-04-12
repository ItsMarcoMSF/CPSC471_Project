import Projects from "../models/projects.js";
import Bugs from "../models/bugs.js";
import Tasks from "../models/task.js";
import User from "../models/user.js";

export const createProjects = async (req, res) => {
  const managerID = req.user.id;
  const { name, deadline, category } = req.body;
  const newProject = new Projects({
    name,
    deadline,
    category,
    managers: managerID,
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

export const getProjectDetail = async (req, res) => {
  const userID = req.user.id;
  const projectID = req.params.projectID;
  try {
    const project = await Projects.findOne({
      $and: [
        { _id: projectID },
        { $or: [{ manager: userID }, { developers: userID }] },
      ],
    });
    const managerIDs = project.managers;
    const devIDs = project.developers;
    const taskIDs = project.tasks;

    var managers = await User.find(
      { _id: { $in: managerIDs } },
      "username email _id"
    );
    var devs = await User.find({ _id: { $in: devIDs } }, "username email _id");
    var tasks = await Tasks.find({ _id: { $in: taskIDs } }).sort({
      deadline: 1,
    });

    let total = await Bugs.countDocuments({ prjID: projectID });
    let resolved = await Bugs.countDocuments({
      $and: [{ prjID: projectID }, { status: "Resolved" }],
    });

    if (total === 0) {
      total = 1;
    }

    let percentage = Math.round((resolved / total) * 100);

    let totalBugs = await Bugs.countDocuments({
      $and: [{ devID: userID }, { prjID: projectID }],
    });
    let resolvedBugs = await Bugs.countDocuments({
      $and: [{ devID: userID }, { prjID: projectID }, { status: "Resolved" }],
    });

    if (totalBugs === 0) {
      totalBugs = 1;
    }

    let percentageUser = Math.round((resolvedBugs / totalBugs) * 100);

    const projectDetail = {
      _id: project._id,
      name: project.name,
      deadline: project.deadline,
      bugs: project.bugs,
      managers: managers,
      developers: devs,
      tasks: tasks,
      projectProgress: percentage,
      userProgress: percentageUser,
      isManager: project.managers.includes(userID),
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };

    res.status(200).json(projectDetail);
  } catch (error) {
    res.status(404).json({ message: "No projects found or Invalid Access" });
  }
};

export const addTask = async (req, res) => {
  const projectID = req.params.projectID;
  const { name, deadline, status } = req.body;

  const newTask = new Tasks({
    name,
    deadline,
    status,
  });

  const taskID = newTask._id;
  try {
    await newTask.save();

    await Projects.updateOne(
      { _id: projectID },
      {
        $addToSet: {
          tasks: taskID,
        },
      }
    );

    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(404).json({ message: "Project Not Found" });
  }
};

export const deleteTask = async (req, res) => {
  const taskID = req.params.taskID;

  try {
    await Tasks.deleteOne({ _id: taskID });

    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(404).json({ message: "Could not delete" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const id = req.params.projectID;
    const userID = req.user.id;

    const result = await Projects.findOneAndDelete({
      $and: [{ _id: id }, { managers: userID }],
    });

    if (!result) {
      res.status(400).json({ message: "Access Denied" });
    } else {
      res.status(201).json({ message: "Success" });
    }
  } catch (error) {
    res.status(400).json({ message: "Access Denied" });
  }
};

export const addDeveloperToProject = async (req, res) => {
  const projectID = req.params.projectID;
  const devID = req.body.devID;
  try {
    await Projects.updateOne(
      { _id: projectID },
      {
        $addToSet: {
          developers: devID,
        },
      }
    );

    return res.status(200).send();
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const addManagerToProject = async (req, res) => {
  const projectID = req.params.projectID;
  const devID = req.body.devID;
  try {
    var result = await Projects.updateOne(
      { _id: projectID },
      {
        $addToSet: {
          managers: devID,
        },
      }
    );

    return res.status(200).send();
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
