import mongoose from "mongoose";

const bugSchema = mongoose.Schema({
  name: String,
  description: String,
  priority: String,
  status: String,
  deadline: Date,
  prjID: { type: mongoose.Schema.Types.ObjectId, ref: "project" },
  devID: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  devName: String,
});

var Bugs = mongoose.model("Bugs", bugSchema);

export default Bugs;