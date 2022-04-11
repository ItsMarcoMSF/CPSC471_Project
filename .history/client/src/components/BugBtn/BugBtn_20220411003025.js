import React, { useEffect, useState } from "react";
import Axios from "axios";

import DetailPopup from "../BugDetail/BugDetail";
import "./BugBtn.css"

const BugBtn = ({ project, bug, fetchBugs }) => {
  const [isDetail, setIsDetail] = useState(false);
  const toggleDetail = () => {
    setIsDetail(!isDetail);
  };

  var someDate = new Date();
  someDate.setDate(someDate.getDate() + 3);
  var date = someDate.toISOString().substring(0, 10);

  const [isLoaded, setIsLoaded] = useState(false);
  const [getBugs, setGetBugs] = useState([]);

  const [markResolved, setMarkResolved] = useState({
    status: "Resolved",
  });

  // const fetchBugs = async () => {
  //   const projID = project._id;
  //   const payload = {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "x-access-token": localStorage.getItem("token"),
  //       },
  //   };

  //   try {
  //     const res = await fetch(
  //       `http://localhost:5000/projects/${projID}/bugs`,
  //       payload,
  //     );
  //     const bug = await res.json();
  //     setIsLoaded(true);
  //     setGetBugs(bug);
  //     console.log(bug);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchBugs();
  // }, []);

  function markAsResolved(e) {
    e.preventDefault();
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    }
    Axios.patch(`http://localhost:5000/bugs/${bug._id}`,
    {
      status: markResolved.status,
    }, config).then((res) => {
      console.log(res.data);
      // Success message
      setIsDetail(false);
      fetchBugs();
      // resetForm();
    });
  }

  function deleteBug(e) {
    e.preventDefault();
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    }
    const element = document.querySelector('#delete-request .status');
    Axios.delete('http://localhost:5000/bugs/${bug._id}').then(() => {
      element.innerHTML = 'Delete successful';
      setIsDetail(false);
      fetchBugs();
    });
  }

  return (
    <div>
      {/* <input
        className="viewDetail"
        type="button"
        value={bug.id + " - " + bug.name + " - " + bug.status}
        onClick={toggleDetail}
      /> */}
      <div
        className="viewDetail"
        // type="button"
        // value={bug.id + " - " + bug.name + " - " + bug.status}
        onClick={toggleDetail}>
          <table className="viewShort">
            {/* <th className="bugID">{bug._id}</th> */}
            <th className="bugName">{bug.name}</th>
            <th className="bugStatus">{bug.status}</th>
          </table>
      </div>

      {isDetail && (
        <DetailPopup
          content={
            <>
              <h2>Bug's detail</h2>
              {/* <li key={bug._id}> */}
              <>
                <div class="col-0 col-s-0">
                  <p>{"ID: " + bug._id}</p>
                  <p>{"Name: " + bug.name}</p>
                  <p>{"Description: " + bug.description}</p>
                </div>
                <div class="col-1 col-s-1">
                  <p>{"Priority: " + bug.priority}</p>
                  { bug.deadline ? (
                    <p>{"Deadline: " + bug.deadline.substring(0, 10)}</p>
                  ) : (
                    <p>{"Deadline: " + date.substring(0, 10)}</p>
                  )}
                  <p>{"Assigned to: " + bug.devName}</p>
                  <p>{"Status: " + bug.status}</p>
                </div>
                <div className="rptfooter">
                  <input className="mark-resolved" type="button" value="Mark as resolved" onClick={(e) => markAsResolved(e)}></input>
                  <input className="delete-bug" type="button" value="Delete this bug" onClick={(e) => deleteBug(e)}></input>
                </div>
              </>
            </>
          }
          handleClose={toggleDetail}
        />
      )}
    </div>
  );
};

export default BugBtn;
