import React from "react";

import ProjectBtn from "../ProjectBtn/ProjectBtn";

const ProjectList = ({ projects, setProject, curProject }) => {
  return (
    <div className="projects-list">
      {projects &&
        projects.map((project) => (
          <ProjectBtn
            key={project._id}
            project={project}
            setProject={setProject}
            curProject={curProject}
          />
        ))}
    </div>
  );
};

export default ProjectList;
