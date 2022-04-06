import React, {useState} from "react";
import AddDev from "../AddDev/AddDev";

import "./ProjectPage.css";

const ProjectPage = ({ project, switchToBugs, Popup }) => {
  const isValidProject = !(Object.keys(project).length === 0);
  const mockProject = {
    projectProgress: "75%",
    yourProgress: "60%",
    upcomingTask: {
      task: "api gateway testing",
      deadline: new Date(Date.parse("2022-04-12")),
    },
    managers: ["Marco Truong"],
    developers: [
      { name: "Marco Truong" },
      { name: "Kaitlin Culligan" },
      { name: "Alvin Nguyen" },
    ],
  };
  const fetchDevs = async () => {};

  const addDev = async () => {};

  const[isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="project-wrapper">
      {isValidProject ? (
        <div>
          <div className="project-page">
            <h2 className="project-name">{project.name}</h2>
            <div id="rectangle-small-left">
              <h2>Project Progress: {mockProject.projectProgress}</h2>
            </div>
            <div id="rectangle-small-right">
              <h2>Your Progress: {mockProject.yourProgress}</h2>
            </div>
            <div id="rectangle-large-top">
              <h2>Upcoming Task</h2>
              <div className="task-wrapper">
                {/* <p>{mockProject.upcomingTask.deadline.getDate()}</p> */}
                <p id="upcomingTask">{mockProject.upcomingTask.task}</p>
              </div>
            </div>
            <div id="rectangle-large-bottom">
              <h2>Project Resources</h2>
              <div id="managers">
                <h3>Managers</h3>
                <p>{mockProject.managers}</p>
                <p>Kaitlin Culligan</p>
                <p>Alvin Nguyen</p>
              </div>
              <div id="developers">
                <h3>Developers</h3>
                <div className="devs-wrapper">
                  {mockProject.developers.map((dev) => (
                    <p>{dev.name}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button className="bug-report-btn" onClick={switchToBugs}>
            Bug Report
          </button>
          <button className="bug-report-btn" onClick={togglePopup}>
            Add Developer
          </button>
            {isOpen && <AddDev content={<>
              <h2 class="dev-form-header">Add A Developer</h2>
              <form onSubmit={(e) => addDev(e)}>
                <p class="dev-labels">Role:</p>
                  <select class="dev-dropdown" name="dev-roles" id ="dev-roles">
                    <option value="manager">Manager</option>
                    <option value="developer">Developer</option>
                  </select>
                  <p class="dev-labels">Friend:</p>
                  <select class="dev-dropdown" name="friends" id ="friends">
                    <option value="f1">friend 1</option>
                    <option value="f1">friend 2</option>
                  </select>
                  <br></br>
                <input class="bug-report-btn " type="submit" value="Add" />
              </form>
          </>}
          handleClose={togglePopup}
          />}
        </div>
      ) : (
        <h2 className="">Choose a project to begin</h2>
      )}
    </div>
  );
};

export default ProjectPage;
