import React from "react";

import "./ProjectPage.css";

const ProjectPage = ({ project, switchToBugs }) => {
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
                <p>{mockProject.upcomingTask.task}</p>
              </div>
            </div>
            <div id="rectangle-large-bottom">
              <h2>Project Resources</h2>
              <h3>Managers</h3>
              <p>{mockProject.managers}</p>
              <h3>Developers</h3>
              <div className="devs-wrapper">
                {mockProject.developers.map((dev) => (
                  <p>{dev.name}</p>
                ))}
              </div>
            </div>
          </div>
          <button className="bug-report-btn" onClick={switchToBugs}>
            Bug Report
          </button>
        </div>
      ) : (
        <h2 className="">Choose a project to begin</h2>
      )}
    </div>
  );
};

export default ProjectPage;
