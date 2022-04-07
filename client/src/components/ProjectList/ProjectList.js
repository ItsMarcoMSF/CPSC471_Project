import React from "react";

import ProjectBtn from "../ProjectBtn/ProjectBtn";

const ProjectList = ({
  projects,
  setProject,
  curProject,
  switchToProject,
  sideBarToggle,
}) => {
  return (
    <div className="projects-list">
      {projects &&
        projects.map((project) => (
          <ProjectBtn
            key={project._id}
            project={project}
            setProject={setProject}
            curProject={curProject}
            switchToProject={switchToProject}
            sideBarToggle={sideBarToggle}
          />
        ))}
    </div>
  );
};

export default ProjectList;
