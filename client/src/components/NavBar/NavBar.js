import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar } from "@mui/material";

import { NavBarWrapper, Icon, CloseIcon } from "./NavBarElements";

import ProjectList from "../ProjectList/ProjectList";

import "./NavBar.css";

const NavBar = ({
  projects,
  setProject,
  curProject,
  switchCreate,
  switchProject,
  isOpen,
  sideBarToggle,
}) => {
  const navigate = useNavigate();

  const [profileClicked, setProfileClicked] = useState(false);
  const [projectClicked, setProjectClicked] = useState(false);
  const [createClicked, setCreateClicked] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    sideBarToggle();
    navigate("/login");
  };

  const handleProfile = (e) => {
    e.preventDefault();
    sideBarToggle();
    navigate("/profile");
  };

  return (
    <NavBarWrapper isOpen={isOpen}>
      <Icon isOpen={isOpen} onClick={sideBarToggle}>
        <CloseIcon />
      </Icon>
      <a
        className="profile-wrapper"
        onClick={(e) => {
          e.preventDefault();
          setProfileClicked(!profileClicked);
        }}
      >
        {/* <Avatar sx={{ bgcolor: "#644aff" }}>M</Avatar> */}
        <p>Welcome</p>
      </a>
      {profileClicked && (
        <div className="profile-links">
          <button type="button" onClick={(e) => handleProfile(e)}>
            Profile
          </button>
          <button type="button" onClick={(e) => handleLogout(e)}>
            Log Out
          </button>
        </div>
      )}
      <div className="main-links">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setProjectClicked(!projectClicked);
            setCreateClicked(false);
            switchProject();
          }}
        >
          Projects
        </button>
      </div>
      {projectClicked && (
        <div className="buttons-wrapper">
          <ProjectList
            projects={projects}
            setProject={setProject}
            curProject={curProject}
            switchToProject={switchProject}
            sideBarToggle={sideBarToggle}
          />
        </div>
      )}
      <div className="main-links">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setProjectClicked(false);
            setCreateClicked(true);
            sideBarToggle();
            switchCreate();
          }}
          style={createClicked ? { backgroundColor: "#333333" } : null}
        >
          Create Project
        </button>
      </div>
    </NavBarWrapper>
  );
};

export default NavBar;
