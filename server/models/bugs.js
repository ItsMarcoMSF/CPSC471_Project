import mongoose from "mongoose";

const bugSchema = mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  priority: String,
  status: String,
  deadline: Date,
  prjID: Number,
});

var Bugs = mongoose.model("Bugs", bugSchema);

export default Bugs;
