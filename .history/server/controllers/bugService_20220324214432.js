import Bugs from "../models/bugs.js";
import mongooseArchive from 'mongoose-archive';

Bugs.plugin(mongooseArchive);

export const archiveBug = async (request, response) => {
  console.log(request.body);
  const bugID = request.params.bugID;

  const bug = await Bugs.archive(bugID);

  response.status(200).json(bug);
};

export const deleteBug = async (request, response) => {
    console.log(request.body);
    const bugID = request.params.bugID;
  
    const bug = await Bugs.deleteOne(bugID);
  
     response.status(200).json(bug);
  };

  export const markResolved = async (request, response) => {
    console.log(request.body);
    const bugID = request.params.bugID;
  
    const bug = await Bugs.findOneAndUpdate(bugID, {$set: {status: true}}, options, callback);
    //await Bugs.save();
  
    response.status(200).json(bug);
  };