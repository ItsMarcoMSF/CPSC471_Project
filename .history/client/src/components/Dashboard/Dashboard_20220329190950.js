import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as api from "../../api/api.js";

import NavBar from "../NavBar/NavBar";
import ProjectPage from "../ProjectPage/ProjectPage";
import CreateProject from "../CreateProject/CreateProject.js";

import "./Dashboard.css";
import BugsPage from "../BugsPage/BugsPage";

const Dashboard = () => {
  const navigate = useNavigate();
  const [projectStage, setProjectStage] = useState(true);
  const [createStage, setCreateStage] = useState(false);

  const switchToCreate = () => {
    setProjectStage(false);
    setCreateStage(true);
  };
  const switchToProject = () => {
    setProjectStage(true);
    setCreateStage(false);
  };

  useEffect(() => {
    fetch("http://localhost:5000/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => (data.isLoggedIn ? null : navigate("/login")));
  });

  const [projects, setProjects] = useState([]);

  const loadProjects = async () => {
    const userID = localStorage.getItem("userID");
    const payload = {
      method: "GET",
    };

    try {
      const res = await fetch(
        `http://localhost:5000/${userID}/projects`,
        payload
      );
      const projects = await res.json();
      setProjects(projects);
      console.log(projects);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const [curProject, setCurProject] = useState(projects[0]);
  //const [curBug, setCurBug] = useState

  useEffect(() => {
    setCurProject(projects[0]);
  }, [projects]);

  return (
    <div className="dashboard-wrapper">
      <NavBar
        projects={projects}
        setProject={setCurProject}
        curProject={curProject}
        switchCreate={switchToCreate}
        switchProject={switchToProject}
      />

      {projectStage && <BugsPage/>}
      {/* {projectStage && <ProjectPage curProject={curProject}/>} */}
      {createStage && (
        <CreateProject
          refreshProjects={loadProjects}
          switchStage={switchToProject}
        />
      )}
    </div>
  );
};

export default Dashboard;
