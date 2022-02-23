import mongoose from "mongoose";

import Bugs from './bugs.js';
import Manager from './managers.js';
import Developers from './developers.js';

// const BugsSchema = Bugs.toObject();
// const ManagerSchema = Manager.toObject();
// const DevelopersSchema = Developers.toObject();

const projectSchema = mongoose.Schema({
  id: Number,
  name: String,
  start_date: String,
  deadline: String,
  category: [String],
  bugs: { type: [mongoose.Schema.Types.ObjectId], ref: 'bugs' },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'manager' },
  developers: { type: [mongoose.Schema.Types.ObjectId], ref: 'developers' },
  // bugs: [Bugs],
  // manager: Manager,
  // developers: [Developers],
});

var Projects = mongoose.model("Projects", projectSchema);

export default Projects;
