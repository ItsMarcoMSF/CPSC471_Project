import React, { useState } from "react";
import Axios from "axios";

import DetailPopup from "../BugDetail/BugDetail";
import "./BugBtn.css";

const BugBtn = ({ bug, fetchBugs }) => {
  const [isDetail, setIsDetail] = useState(false);
  const toggleDetail = () => {
    setIsDetail(!isDetail);
  };

  var someDate = new Date();
  someDate.setDate(someDate.getDate() + 3);
  var date = someDate.toISOString().substring(0, 10);

  const [rd, setRd] = useState(false);

  const [markResolved, setMarkResolved] = useState({
    status: "Resolved",
  });

  function markAsResolved(e) {
    e.preventDefault();
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    };
    Axios.patch(
      `http://localhost:5000/bugs/${bug._id}`,
      {
        status: markResolved.status,
      },
      config
    ).then((res) => {
      console.log(res.data);
      // Success message
      setIsDetail(false);
      setRd(true);
      fetchBugs();
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
    };
    Axios.delete(`http://localhost:5000/bugs/${bug._id}`, config).then(() => {
      setIsDetail(false);
      fetchBugs();
    });
  }

  return (
    <div>
      <div className="viewDetail" onClick={toggleDetail}>
        <table className="viewShort">
          <th className="bugName">{bug.name}</th>
          {bug.status === "Resolved" ? (
            <th className="bugStatus rd">{bug.status}</th>
          ) : (
            <th className="bugStatus urd">{bug.status}</th>
          )}
        </table>
      </div>

      {isDetail && (
        <DetailPopup
          content={
            <>
              <h2>Bug's detail</h2>
              <>
                <div class="col-2 col-s-2">
                  <p>
                    <b>Name: </b> {bug.name}
                  </p>
                  {bug.deadline ? (
                    <p>
                      <b>Deadline: </b> {bug.deadline.substring(0, 10)}
                    </p>
                  ) : (
                    <p>
                      <b>Deadline: </b> {date.substring(0, 10)}
                    </p>
                  )}
                </div>
                <div class="col-3 col-s-3">
                  <p>
                    <b>Priority: </b> {bug.priority}
                  </p>
                  <p>
                    <b>Assign to: </b> {bug.devName}
                  </p>
                  <p>
                    <b>Status: </b> {bug.status}
                  </p>
                </div>
                <div className="detailfooter">
                  <p className="detaildes detailsmall">
                    <b>Description: </b> {bug.description}
                  </p>
                  <input
                    className="mark-resolved"
                    type="button"
                    value="Mark as resolved"
                    onClick={(e) => markAsResolved(e)}
                  ></input>
                  <input
                    className="delete-bug"
                    type="button"
                    value="Delete this bug"
                    onClick={(e) => deleteBug(e)}
                  ></input>
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
