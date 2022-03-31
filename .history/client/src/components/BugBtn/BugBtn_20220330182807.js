import React, { useState } from "react";
import DetailPopup from "../BugDetail/BugDetail";

const BugBtn = ({ bug }) => {
  const [isDetail, setIsDetail] = useState(false);
  const toggleDetail = () => {
    setIsDetail(!isDetail);
  };

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
          <table>
            <th>{bug.id}</th>
            <th>{bug.name}</th>
            <th>{bug.status}</th>
          </table>
      </div>

      {isDetail && (
        <DetailPopup
          content={
            <>
              <h2>Bug's detail</h2>
              {/* <li key={bug._id}> */}
              <>
                <p>{"ID: " + bug.id}</p>
                <p>{"Name: " + bug.name}</p>
                <p>{"Description: " + bug.description}</p>
                <p>{"Priority: " + bug.priority}</p>
                <p>{"Deadline: " + bug.deadline.substring(0, 10)}</p>
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
