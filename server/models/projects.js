import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    name: String,
    deadline: Date,
    category: [String],
    bugs: { type: [mongoose.Schema.Types.ObjectId], ref: "bugs" },
    managers: { type: [mongoose.Schema.Types.ObjectId], ref: "users" },
    developers: { type: [mongoose.Schema.Types.ObjectId], ref: "users" },
    tasks: { type: [mongoose.Schema.Types.ObjectId], ref: "tasks" },
  },
  { timestamps: true }
);

var Projects = mongoose.model("Projects", projectSchema);

export default Projects;
