import mongoose from "mongoose";

const bugSchema = mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  priority: String,
  status: String,
  deadline: Date,
});

var Bugs = mongoose.model("Bugs", bugSchema);

export default Bugs;
