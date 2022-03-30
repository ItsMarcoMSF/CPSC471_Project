import React from "react";

import "./ProjectPage.css";

const ProjectPage = ({ project }) => {

  return (
    <div className="project-wrapper">
      {project ? (
        <><div id="rectangle-small-left">
          <h2>Project Progress:</h2>
        </div>
        <div id="rectangle-small-right">
            <h2>Your Progress:</h2>
        </div>
        <div id="rectangle-large">
            <h2>Upcoming Task</h2>
            <p>{project.bugs[0].name}</p>
            <p>{project.bugs[0].deadline}</p>
        </div>
        <div id="rectangle-large">
            <h2>Project Resources</h2>
            <h3>Managers</h3>
            <p>{project.manager.name}</p>
            <h3>Developers</h3>
            <p>{project.developer[0].name}</p>
        </div>
        </>
      ) : (
        <h2>There is no project</h2>
      )}
    </div>
  );
};

export default ProjectPage;
