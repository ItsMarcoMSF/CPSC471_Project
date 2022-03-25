import User from "../models/user.js";

// Will get called multiple times in api to handle getting multiple bugs
export const getUsersByID = async (request, response) => {
  try {
    // console.log(request.params);
    const userID = request.params.userID;

    const user = await User.findById(userID);

    response.status(200).json(user);
    // return bug;
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};
