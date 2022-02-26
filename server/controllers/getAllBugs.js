import Bugs from "../models/bugs.js"

export const getAllBugs = async (request, response) => {
    try {
        const bugs = await Bugs.find();

        console.log(bugs);
        response.status(200).json(bugs);
    } catch (error) {
        response.status(404).json({ message: error.message });
    }
}