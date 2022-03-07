import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    languages: {
      type: [String],
    },
    projects: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "projects",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
