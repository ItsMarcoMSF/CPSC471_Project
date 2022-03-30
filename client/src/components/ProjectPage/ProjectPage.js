import React from "react";

import "./ProjectPage.css";

const ProjectPage = ({ project, switchToBugs }) => {
  return (
    <div className="project-wrapper">
      {project ? (
        <div>
          <h2>{project.name}</h2>
          <p>There is a project</p>
          <button onClick={switchToBugs}>Bug Report</button>
        </div>
      ) : (
        <h2>There is no project</h2>
      )}
    </div>
  );
};

export default ProjectPage;
