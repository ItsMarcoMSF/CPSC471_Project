import Bugs from "../models/bugs.js";

// Will get called multiple times in api to handle getting multiple bugs
export const getBugsByID = async (request, response) => {
  try {
    // console.log(request.params);
    const bugID = request.params.bugID;

    const bug = await Bugs.findById(bugID);

    response.status(200).json(bug);
    // return bug;
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};
