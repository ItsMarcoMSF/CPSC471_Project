import React, {useEffect, useState} from "react";
import Axios from "axios";
import AddDev from "../AddDev/AddDev";

import "./ProjectPage.css";
import AddDevFriends from "../AddDevFriends/AddDevFriends";

const ProjectPage = ({ project, switchToBugs, Popup }) => {
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

  const [getDevelopers, setGetDevelopers] = useState([]);
  const [getManagers, setGetManagers] = useState([]);
  const [getFriends, setGetFriends] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchDevs = async () => {
    const projID = project._id;
    const payload = {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    try {
      const res = await fetch(
        `http://localhost:5000/projects/${projID}/developers`,
        payload
      );
      const developer = await res.json();
      setGetDevelopers(developer);
      console.log(developer);
    } catch (err) {
      console.error(err);
    }}
  ;

  const fetchManagers = async () => {
    const projID = project._id;
    const payload = {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    try {
      const res = await fetch(
        `http://localhost:5000/projects/${projID}/managers`,
        payload
      );
      const manager = await res.json();
      setGetManagers(manager);
      console.log(manager);
    } catch (err) {
      console.error(err);
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
      const res = await fetch(
        `http://localhost:5000/projects/user/friends`,
        payload
      );
      const friends = await res.json();
      setGetFriends(friends);
      console.log(friends);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTask = async () => {

  };

  const fetchProjectProgress = async () => {};

  const fetchPersonalProgress = async () => {};

  function handleAddDevSubmit(e){
    if(e.target.value === "developer"){
      addDev(e);
    }
    else{
      addManager(e);
    }
  }

  const [sendDev, setSendDev] = useState({
    id: "",
  });

  function addDev(e) {
    const newdev = { ...sendDev};
    newdev[e.target.id] = e.target.value;
    setSendDev(newdev);
  };

  const [sendManager, setSendManager] = useState({
    id: "",
  });

  function addManager(e) {
    const newmanager = { ...sendManager};
    newmanager[e.target.id] = e.target.value;
    setSendManager(newmanager);
  };

  const[isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    //fetchManagers();
   // fetchDevs();
    fetchFriends();
  }, []);
  return (
    <div className="project-wrapper">
      {isValidProject ? (
        <div>
          <div className="project-page">
            <h2 className="project-name">{project.name}</h2>
            <div id="rectangle-small-left">
              <h2>Project Progress: {mockProject.projectProgress}</h2>
            </div>
            <div id="rectangle-small-right">
              <h2>Your Progress: {mockProject.yourProgress}</h2>
            </div>
            <div id="rectangle-large-top">
              <h2>Upcoming Task</h2>
              <div className="task-wrapper">
                {/* <p>{mockProject.upcomingTask.deadline.getDate()}</p> */}
                <p id="upcomingTask">{project.tasks[0]}</p>
              </div>
            </div>
            <div id="rectangle-large-bottom">
              <h2>Project Resources</h2>
              <div id="managers">
                <h3>Managers</h3>
                {getManagers.map(manager=>(
                  <p>{manager.name}</p>
                ))}
              </div>
              <div id="developers">
                <h3>Developers</h3>
                <div className="devs-wrapper">
                  {getFriends.map((friend) => (
                    <p>{friend.username}</p>
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
            {isOpen && <AddDev content={<>
              <h2 class="dev-form-header">Add A Developer</h2>
              <form onSubmit={(e) => handleAddDevSubmit(e)}>
                <p class="dev-labels">Role:</p>
                  <select class="dev-dropdown" name="dev-roles" id ="dev-roles">
                    <option value="manager">Manager</option>
                    <option value="developer">Developer</option>
                  </select>
                  <p class="dev-labels">Friend:</p>
                  <select class="dev-dropdown" name="dev" id ="dev">
                    <AddDevFriends friends={getFriends}/>
                  </select>
                  <br></br>
                <input class="bug-report-btn " type="submit" value="Add" />
              </form>
          </>}
          handleClose={togglePopup}
          />}
        </div>
      ) : (
        <h2 className="">Choose a project to begin</h2>
      )}
    </div>
  );
};

export default ProjectPage;
