import mongoose from "mongoose";

const managerSchema = mongoose.Schema({
  id: Number,
  name: String,
  email: String,
});

var Managers = mongoose.model("Managers", managerSchema);

export default Managers;
