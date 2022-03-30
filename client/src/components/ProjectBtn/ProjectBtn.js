import React from "react";

import "./ProjectBtn.css";

const ProjectBtn = ({ project, setProject, curProject, switchToProject }) => {
  const handleProject = (e) => {
    e.preventDefault();
    setProject(project);
    switchToProject();
  };

  const isCur = project._id === curProject._id;

  return (
    <div>
      <button
        className="project-btn"
        type="button"
        onClick={handleProject}
        style={isCur ? { backgroundColor: "#333333" } : null}
      >
        {project.name}
      </button>
    </div>
  );
};

export default ProjectBtn;
