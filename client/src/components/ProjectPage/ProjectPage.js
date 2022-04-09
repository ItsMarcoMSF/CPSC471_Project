
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AddDev from "../AddDev/AddDev";

import "./ProjectPage.css";
import AddDevFriends from "../AddDevFriends/AddDevFriends";

const ProjectPage = ({ project, switchToBugs, Popup }) => {
  const navigate = useNavigate();
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


  const [projectDetails, setProjectDetails] = useState({});
  const [getFriends, setGetFriends] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);


  const [addOption, setAddOption] = useState("");
  const [devToAdd, setDevToAdd] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };


  const fetchProjectDetails = async () => {
    if (!isValidProject) {
      return;
    }
    const projID = project._id;
    console.log(projID);
    const payload = {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    try {
      const res = await fetch(
        `http://localhost:5000/projects/${projID}`,
        payload
      );
      const details = await res.json();

      setProjectDetails(details);
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFriends = async () => {
    const payload = {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    try {
      const res = await fetch(`http://localhost:5000/user/friends`, payload);
      const friends = await res.json();
      setGetFriends(friends);
      console.log(friends);
    } catch (err) {
      console.error(err);
    }
  };

  function fetchProjectProgress() {
    let total = 0;
    let resolved = 0;

    for (let i = 0; i < projectDetails.tasks.length; i++) {
      if (projectDetails.tasks[i].status === "Resolved") {
        resolved++;
      }
      total++;
    }

    let percentage = (resolved / total) * 100;

    return percentage;
  }

  function fetchPersonalProgress() {
    let total = 0;
    let resolved = 0;

    for (let i = 0; i < projectDetails.tasks.length; i++) {
      if (projectDetails.tasks[i]) {
        if (projectDetails.tasks[i].status === "Resolved") {
          resolved++;
        }
        total++;
      }
    }

    let percentage = (resolved / total) * 100;

    return percentage;
  }

  const deleteProject = async () => {
    const projID = project._id;
    const payload = {
      method: "DELETE",
      headers: {},
    };

    try {
      await fetch(`http://localhost:5000/projects/${projID}`, payload);
      window.location.reload(false);
    } catch (err) {
      console.error(err);
    }
  };

  const refreshProject = () => {
    project = null;
    navigate("/dashboard");
  };

  const handleAddDevSubmit = async (e) => {
    e.preventDefault();
    const projID = project._id;
    const payload = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        devID: devToAdd,
      }),
    };

    try {
      await fetch(
        `http://localhost:5000/projects/${projID}/${addOption}`,
        payload
      );
      refreshProject();
      togglePopup();
    } catch (err) {
      console.log(err);
    }
  };

  const devOptions = () => {
    let options = [];
    for (let i = 0; i < getFriends.length; i++) {
      options.push(
        <option key={i} value={getFriends[i]._id}>
          {getFriends[i].username}
        </option>
      );
    }
    return options;
  };

  useEffect(() => {
    if (isValidProject) {
      fetchProjectDetails();
    }
    fetchFriends();
  }, [project]);


  return (
    <div className="project-wrapper">
      {isLoaded ? (
        <div>
          <div className="project-page">
            <h2 className="project-name">{project.name}</h2>
            <div id="rectangle-small-left">
              <h2>Project Progress: {fetchProjectProgress}%</h2>
            </div>
            <div id="rectangle-small-right">
              <h2>Your Progress: {mockProject.yourProgress}</h2>
            </div>
            <div id="rectangle-large-top">
              <h2>Upcoming Task</h2>
              <div className="task-wrapper">
                {/* <p>{mockProject.upcomingTask.deadline.getDate()}</p> */}

                <p id="upcomingTask">
                  {projectDetails.tasks.length > 0 &&
                    projectDetails.tasks[0].name}
                </p>

              </div>
            </div>
            <div id="rectangle-large-bottom">
              <h2>Project Resources</h2>
              <div id="managers">
                <h3>Managers</h3>

                {projectDetails &&
                  projectDetails.managers.map((manager) => (
                    <p>{manager.name}</p>
                  ))}

              </div>
              <div id="developers">
                <h3>Developers</h3>
                <div className="devs-wrapper">

                  {projectDetails &&
                    projectDetails.developers.map((developer) => (
                      <p>{developer.username}</p>
                    ))}

                </div>
              </div>
            </div>
          </div>
          <button className="bug-report-btn" onClick={switchToBugs}>
            Bug Report
          </button>
          <button className="bug-report-btn" onClick={togglePopup}>
            Add Developer
          </button>
          {isOpen && (
            <AddDev
              content={
                <>
                  <h2 class="dev-form-header">Add A Developer</h2>
                  <form onSubmit={(e) => handleAddDevSubmit(e)}>
                    <p class="dev-labels">Role:</p>
                    <select
                      class="dev-dropdown"
                      name="dev-roles"
                      id="dev-roles"
                      onChange={(e) => {
                        e.preventDefault();
                        setAddOption(e.target.value);
                      }}
                    >
                      <option disabled selected value>
                        {" "}
                        -- select an option --{" "}
                      </option>
                      <option value="managers">Manager</option>
                      <option value="developers">Developer</option>
                    </select>
                    <p class="dev-labels">Friend:</p>
                    <select
                      className="dev-dropdown"
                      name="dev"
                      id="dev"
                      onChange={(e) => {
                        e.preventDefault();
                        setDevToAdd(e.target.value);
                      }}
                    >
                      <option disabled selected value>
                        {" "}
                        -- select an option --{" "}
                      </option>
                      {devOptions()}
                    </select>
                    <br></br>
                    <input class="bug-report-btn " type="submit" value="Add" />
                  </form>
                </>
              }
              handleClose={togglePopup}
            />
          )}
          <button className="bug-report-btn">Add Task</button>

          <button className="bug-report-btn" onClick={deleteProject}>
            Delete This Project
          </button>
        </div>
      ) : (
        <h2 className="">Choose a project to begin</h2>
      )}
    </div>
  );
};

export default ProjectPage;
