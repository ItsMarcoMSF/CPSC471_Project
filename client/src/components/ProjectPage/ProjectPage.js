import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AddDev from "../AddDev/AddDev";

import AddTask from "../AddTask/AddTask";

import "./ProjectPage.css";

const ProjectPage = ({ project, switchToBugs, Popup }) => {
  const navigate = useNavigate();
  const isValidProject = !(Object.keys(project).length === 0);

  const [projectDetails, setProjectDetails] = useState({});
  const [getFriends, setGetFriends] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [addOption, setAddOption] = useState("");
  const [devToAdd, setDevToAdd] = useState("");

  const [taskName, setTaskName] = useState("");
  const [taskDeadline, setTaskDeadline] = useState(new Date());
  const [taskStatus, setTaskStatus] = useState("");

  const [isOpenDev, setIsOpenDev] = useState(false);
  const togglePopup = () => {
    setIsOpenDev(!isOpenDev);
  };

  const [isOpenTask, setIsOpenTask] = useState(false);
  const toggleTaskPopup = () => {
    setIsOpenTask(!isOpenTask);
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

  const deleteProject = async () => {
    const projID = project._id;
    const payload = {
      method: "DELETE",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    try {
      await fetch(`http://localhost:5000/projects/${projID}`, payload);
      window.location.reload(false);
    } catch (err) {
      console.error(err);
    }
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
      fetchProjectDetails();
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

  const resetForm = () => {
    setTaskName("");
    setTaskDeadline("");
    setTaskStatus("");
  };

  const createTask = async (e) => {
    const projID = project._id;
    e.preventDefault();
    const newTask = {
      name: taskName,
      deadline: taskDeadline,
      status: taskStatus,
    };

    try {
      await fetch(`http://localhost:5000/projects/${projID}/tasks`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(newTask),
      });
      resetForm();
      toggleTaskPopup();
      fetchProjectDetails();
    } catch (err) {
      console.log(err);
    }
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
              <h2>Project Progress: {projectDetails.projectProgress}</h2>
            </div>
            <div id="rectangle-small-right">
              <h2>Personal Progress: {projectDetails.projectProgress}</h2>
            </div>
            <div id="rectangle-large-top">
              <h2>Upcoming Task</h2>
              <div className="task-wrapper">
                <p id="upcomingTask">
                  {projectDetails.tasks.length > 0
                    ? projectDetails.tasks[0].name
                    : "No upcoming Task"}
                </p>
              </div>
            </div>
            <div id="rectangle-large-bottom">
              <h2>Project Resources</h2>
              <div id="managers">
                <h3>Managers</h3>
                <div className="devs-wrapper">
                  {projectDetails &&
                    projectDetails.managers.map((manager) => (
                      <p>
                        {projectDetails.managers.length > 0 && manager.username}
                      </p>
                    ))}
                </div>
              </div>
              <div id="developers">
                <h3>Developers</h3>
                <div className="devs-wrapper">
                  {projectDetails &&
                    projectDetails.developers.map((developer) => (
                      <p>
                        {projectDetails.developers.length > 0 &&
                          developer.username}
                      </p>
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
          {isOpenDev && (
            <AddDev
              content={
                <>
                <div className="form">
                  <h2 className="dev-form-header">Add A Developer</h2>
                  <form onSubmit={(e) => handleAddDevSubmit(e)}>
                    <p class="dev-labels">Role:</p>
                    <select
                      className="dev-dropdown"
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
                    <p className="dev-labels">Friend:</p>
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
                    <input className="bug-report-btn " type="submit" value="Add" />
                  </form>
                  </div>
                </>
              }
              handleClose={togglePopup}
            />
          )}
          <button className="bug-report-btn" onClick={toggleTaskPopup}>
            Add Task
          </button>

          {isOpenTask && (
            <AddTask
              content={
                <>
                  <form onSubmit={createTask}>
                    <h2 className="task-form-header">Add A Task</h2>
                    <label className="task-labels" htmlFor="name">Name</label>
                    <br></br>
                    <input
                      type="text"
                      name="name"
                      id="inputID"
                      placeholder="Task Name..."
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                    />
                    <br></br>
                    <label className="task-labels" htmlFor="deadline">Deadline</label>
                   <br></br>
                    <input
                      type="date"
                      name="deadline"
                      id="inputID"
                      placeholder="Set a deadline"
                      value={taskDeadline}
                      onChange={(e) => setTaskDeadline(e.target.value)}
                    />
                    <br></br>
                    <label className="task-labels" htmlFor="status">Status</label>
                    <br></br>
                    <input
                      type="text"
                      name="status"
                      id="inputID"
                      placeholder="Set a Status"
                      value={taskStatus}
                      onChange={(e) => setTaskStatus(e.target.value)}
                    />
                    <br></br>
                    <button className="bug-report-btn" type="submit">
                      Create
                    </button>
                  </form>
                </>
              }
              handleClose={toggleTaskPopup}
            />
          )}
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