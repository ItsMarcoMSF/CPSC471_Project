import React, { useState } from "react";
import DetailPopup from "../BugDetail/BugDetail";

const BugBtn = ({ bug }) => {
  const [isDetail, setIsDetail] = useState(false);
  const toggleDetail = () => {
    setIsDetail(!isDetail);
  };

  return (
    <div>
      <input
        className="viewDetail"
        type="button"
        value={bug.id + " - " + bug.name + " - " + bug.status}
        onClick={toggleDetail}
      />
      {isDetail && (
        <DetailPopup
          content={
            <>
              <b>Bug's detail</b>
              {/* <li key={bug._id}> */}
              <li>
                <p>{"id: " + bug.id}</p>
                <p>{"name: " + bug.name}</p>
                <p>{"description: " + bug.description}</p>
                <p>{"priority: " + bug.priority}</p>
                <p>{"deadline: " + bug.deadline.substring(0, 10)}</p>
                <p>{"status: " + bug.status}</p>
              </li>
            </>
          }
          handleClose={toggleDetail}
        />
      )}
    </div>
  );
};

export default BugBtn;
