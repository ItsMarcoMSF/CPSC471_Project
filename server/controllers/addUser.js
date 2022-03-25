import User from "../models/user.js";

export const addUser = async (request, response) => {
  console.log(request.body);
  const { username, email, password, languages, projects } = request.body;

  const newUser = new User({
    username,
    email,
    password,
    languages,
    projects
  });

  try {
    await newUser.save();

    response.status(201).json(newUser);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};
