import React, { useState } from "react";
import DetailPopup from "../BugDetail/BugDetail";
import "./BugBtn.css"

const BugBtn = ({ bug }) => {
  const [isDetail, setIsDetail] = useState(false);
  const toggleDetail = () => {
    setIsDetail(!isDetail);
  };

  var someDate = new Date();
  someDate.setDate(someDate.getDate() + 3);
  var date = someDate.toISOString().substring(0, 10);

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
            <th className="bugID">{bug._id}</th>
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
                <p>{"ID: " + bug._id}</p>
                <p>{"Name: " + bug.name}</p>
                <p>{"Description: " + bug.description}</p>
                <p>{"Priority: " + bug.priority}</p>
                { bug.deadline ? (
                  <p>{"Deadline: " + bug.deadline.substring(0, 10)}</p>
                ) : (
                  <p>{"Deadline: " + date.substring(0, 10)}</p>
                )}
                <p>{"Assigned to: " + bug.devID}</p>
                <p>{"Status: " + bug.status}</p>
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
