import React from "react";

import ProjectBtn from "../ProjectBtn/ProjectBtn";

const ProjectList = ({ projects, setProject, curProject, switchToProject }) => {
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
          />
        ))}
    </div>
  );
};

export default ProjectList;
