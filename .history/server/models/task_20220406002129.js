import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    name: String,
    deadline: Date,
    status: String,
  },
  { timestamps: true }
);

var Tasks = mongoose.model("Tasks", taskSchema);

export default Tasks;