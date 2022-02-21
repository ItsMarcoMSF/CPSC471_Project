import mongoose from "mongoose";

import bugs from "./bugs";
import Manager from "./managers";
import Developers from "./developers";

const projectSchema = mongoose.Schema({
  id: Number,
  name: String,
  start_date: Date,
  deadline: Date,
  category: [String],
  bugs: [bugs],
  manager: Manager,
  developers: [Developers],
});

var Projects = mongoose.model("Projects", projectSchema);

export default Projects;
