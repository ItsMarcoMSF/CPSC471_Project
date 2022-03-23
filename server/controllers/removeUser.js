import User from "../models/user.js";

export const removeUser = async (request, response) => {
  console.log(request.body);
  const userID = request.params.userID;

  const user = await User.deleteOne(userID);

   response.status(200).json(user);
};
