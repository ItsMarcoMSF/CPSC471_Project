import Bugs from "../models/bugs.js";
import mongooseArchive from "mongoose-archive";

// Bugs.plugin(mongooseArchive);

export const createBugs = async (request, response) => {
  console.log(request.body);
  const { name, description, priority, status, deadline, prjID } = request.body;

  const newBug = new Bugs({
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

export const getBugsByID = async (request, response) => {
  try {
    // console.log(request.params);
    const bugID = request.params.bugID;

    const bug = await Bugs.findById(bugID);

    response.status(200).json(bug);
    // return bug;
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const archiveBug = async (request, response) => {
  console.log(request.body);
  const bugID = request.params.bugID;

  const bug = await Bugs.archive(bugID);

  response.status(200).json(bug);
};

export const deleteBug = async (request, response) => {
  console.log(request.body);
  const bugID = request.params.bugID;

  const bug = await Bugs.deleteOne(bugID);

  response.status(200).json(bug);
};

export const markResolved = async (request, response) => {
  console.log(request.body);
  const bugID = request.params.bugID;

  const bug = await Bugs.findOneAndUpdate(
    { _id: bugID },
    { $set: { status: "resolved" } },
    options,
    callback
  );
  //await Bugs.save();

  response.status(200).json(bug);
};

export const getBugsByPrjID = async (req, res) => {
  try {
    const prjID = req.params.projectID;

    const bugs = await Bugs.find({
      $or: [{ prjID: prjID }],
    }).sort({
      status: -1,
    });

    res.status(200).json(bugs);
  } catch (error) {
    res.status(404).json({ message: "No bugs found" });
  }
};
