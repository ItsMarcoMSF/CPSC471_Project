import mongoose from "mongoose";

const devSchema = mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  languages: [String],
});

var Developers = mongoose.model("Developers", devSchema);

export default Developers;
