import React from "react";

import "./ProjectPage.css";

const ProjectPage = ({ project }) => {
  return (
    <div className="project-wrapper">
      {project ? (
        <div>
          <h2>{project.name}</h2>
          <p>There is a project</p>
        </div>
      ) : (
        <h2>There is no project</h2>
      )}
    </div>
  );
};

export default ProjectPage;
