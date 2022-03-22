import Bugs from "../models/bugs.js";

export const deleteBug = async (request, response) => {
  console.log(request.body);
  const bugID = request.params.bugID;

  const bug = await Bugs.deleteOne(bugID);

   response.status(200).json(bug);
};