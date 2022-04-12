import React, { useEffect, useState } from "react";
import Axios from "axios";

import "./BugsPage.css";

import Popup from "../CreateBug/CreateBug";
import DetailPopup from "../BugDetail/BugDetail";
import BugLists from "../BugLists/BugLists";
import ReportBtn from "../ReportBtn/ReportBtn";

const BugsPage = ({ project, switchToProject }) => {

  // const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
  // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const [getDevs, setGetDevs] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [getBugs, setGetBugs] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isDetail, setIsDetail] = useState(false);

  var someDate = new Date();
  someDate.setDate(someDate.getDate() + 3);
  var date = someDate.toISOString().substring(0, 10);

  const mockup = {
    developer1: "Marco Truong",
    developer2: "Kaitlin Culligan",
    developer3: "Alvin Nguyen",
  };

  const [sendBug, setSendBug] = useState({
    name: "",
    description: "",
    priority: "Medium",
    deadline: someDate,
    devID: "",
    status: "Unresolved",
  });
  const resetForm = () => {
    setSendBug("");
  };

  function handle(e) {
    const newbug = { ...sendBug };
    newbug[e.target.id] = e.target.value;
    setSendBug(newbug);
  }

  function reportBug(e) {
    e.preventDefault();
    const payload = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    };
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    }
    Axios.post("http://localhost:5000/bugs",
    {
      name: sendBug.name,
      description: sendBug.description,
      priority: sendBug.priority,
      deadline: sendBug.deadline,
      status: sendBug.status,
      prjID: project._id,
      devID: sendBug.devID,
    }, config).then((res) => {
      console.log(res.data);
      // Success message
      setIsOpen(false);
      fetchBugs();
      resetForm();

    });
  }

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const toggleDetail = () => {
    setIsDetail(!isDetail);
  };

  const fetchBugs = async () => {
    const projID = project._id;
    const payload = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
    };

    try {
      const res = await fetch(
        `http://localhost:5000/projects/${projID}/bugs`,
        payload,
      );
      const bug = await res.json();
      setIsLoaded(true);
      setGetBugs(bug);
      console.log(bug);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDev = async () => {
    const payload = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
    };

    try {
      const res = await fetch(
        `http://localhost:5000/user/friends`,
        payload,
      );
      const dev = await res.json();
      setIsLoaded(true);
      setGetDevs(dev);
      console.log(dev);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  useEffect(() => {
    fetchDev();
  }, []);

  function createSelectDevs() {
    let devs = [];         
    for (let i = 0; i < getDevs.length; i++) {             
         devs.push(<option key={i} value={getDevs[i]._id}>{getDevs[i].username}</option>);   
         //here I will be creating my options dynamically based on
         //what props are currently passed to the parent component
    }
    return devs;
};

  function onDropdownSelected(e) {
    console.log("THE VAL", e.target.value);
    //here you will see the current selected value of the select input
  };

  return (
    <div className="bugs-wrapper">
      {/* {isDesktopOrLaptop && <p>You are a desktop or laptop</p>}
      {isTabletOrMobile && <p>You are a tablet or mobile</p>} */}
      <button className="back-btn" onClick={switchToProject}>
        Go back
      </button>
      <br></br>
      {getBugs.length > 0 ? (
        <div>
          <h2 className="bugs-reported">Bugs reported:</h2>
          <nav>
            <ul className="ul-styles">
              <BugLists bugs={getBugs} toggleDetail={toggleDetail} />
            </ul>
          </nav>
          <input
            className="rptbtn"
            type="button"
            value="Report new bug"
            onClick={togglePopup}
          />
          {isOpen && (
            <Popup
              content={
                <>
                  <div class="col-3 col-s-3">
                  </div>
                  <h2>Report a new bug</h2>
                  <p>Enter details about new bugs here</p>
                  <form className="report-form" onSubmit={(e) => reportBug(e)}>
                    <div className="rptrow">
                      <div class="col-0 col-s-0">
                        <h3>Bug name</h3>
                        <input
                          className="enter-name"
                          value={sendBug.name}
                          onChange={(e) => handle(e)}
                          id="name"
                          type="text"
                        />
                        <h3>Bug deadline</h3>
                        <input
                          className="enter-deadline"
                          value={sendBug.deadline}
                          onChange={(e) => handle(e)}
                          id="deadline"
                          type="date"
                        />
                      </div>
                      <div class="col-1 col-s-1">    
                        <h3 className="input-label">Bug priority</h3>
                        <select className="dropdown enter-selection" id="priority" onChange={(e) => handle(e)}>
                          <option value="High">High</option>
                          <option value="Medium" selected>Medium</option>
                          <option value="Low">Low</option>
                        </select>                    
                        <h3 className="input-label">Assign to</h3>
                        <select className="enter-selection" id="devID" value={sendBug.devID} onChange={(e) => handle(e)} label="Multiple Select" multiple>
                          {createSelectDevs()}
                        </select>
                      </div>
                    </div>
                    <div className="rptfooter">
                      <h3 className="footer-label">Bug description</h3>
                      <textarea
                        className="enter-description"
                        value={sendBug.description}
                        onChange={(e) => handle(e)}
                        id="description"
                        type="text"
                      />
                      <div>
                        <h3
                          value="Unresolved"
                          id="status"
                        >Bug status: Unresolved</h3>
                      </div>
                      {/* <p/> */}
                      <br/>
                      <input className="rpt" type="submit" value="Report" />
                    </div>
                  </form>
                </>
              }
              handleClose={togglePopup}
            />
          )}
        </div>
      ) : (
        <div>
          <h2>There is no bug</h2>
          <input className="rptbtn" type="button" value="Report new bug" onClick={togglePopup} />
          {isOpen && (
            <Popup
              content={
                <>
                  <h2>Report a new bug</h2>
                  <p>Enter details about new bugs here</p>
                  <form className="report-form" onSubmit={(e) => reportBug(e)}>
                    <div className="rptrow">
                      <div class="col-0 col-s-0">
                        <h3>Bug name</h3>
                        <input
                          className="enter-name"
                          value={sendBug.name}
                          onChange={(e) => handle(e)}
                          id="name"
                          type="text"
                        />
                        <h3>Bug deadline</h3>
                        <input
                          className="enter-deadline"
                          value={sendBug.deadline}
                          onChange={(e) => handle(e)}
                          id="deadline"
                          type="date"
                        />
                      </div>
                      <div class="col-1 col-s-1">    
                        <h3 className="input-label">Bug priority</h3>
                        <select className="dropdown enter-selection" id="priority" onChange={(e) => handle(e)}>
                          <option value="High">High</option>
                          <option value="Medium" selected>Medium</option>
                          <option value="Low">Low</option>
                        </select>                    
                        <h3 className="input-label">Assign to</h3>
                        <select className="enter-selection" id="devID" value={sendBug.devID} onChange={(e) => handle(e)} label="Multiple Select" multiple>
                          {createSelectDevs()}
                        </select>
                      </div>
                    </div>
                    <div className="rptfooter">
                      <h3 className="footer-label">Bug description</h3>
                      <textarea
                        className="enter-description"
                        value={sendBug.description}
                        onChange={(e) => handle(e)}
                        id="description"
                        type="text"
                      />
                      <div>
                        <h3
                          value="Unresolved"
                          id="status"
                        >Bug status: Unresolved</h3>
                      </div>
                      {/* <p/> */}
                      <br/>
                      <input className="rpt" type="submit" value="Report" />
                    </div>
                  </form>
                </>
              }
              handleClose={togglePopup}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BugsPage;
