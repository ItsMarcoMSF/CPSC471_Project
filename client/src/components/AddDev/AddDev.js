import React, { useEffect, useState } from "react";

import "./AddDev.css";

const AddDev = (props) => {
  const [addOption, setAddOption] = useState("");
  const [devToAdd, setDevToAdd] = useState("");

  const devOptions = () => {
    let options = [];
    for (let i = 0; i < props.friends.length; i++) {
      options.push(
        <option key={i} value={props.friends[i]._id}>
          {props.friends[i].username}
        </option>
      );
    }
    return options;
  };

  const handleAddDevSubmit = async (e) => {
    e.preventDefault();
    const projID = props.id;
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
      props.details();
      props.handleClose();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="adddev-popup-box">
      <div className="adddev-box">
        <span className="adddev-close-icon" onClick={props.handleClose}>
          x
        </span>
        <div className="dev-form">
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
              required
            >
              <option disabled selected value="">
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
              required
            >
              <option disabled selected value="">
                {" "}
                -- select an option --{" "}
              </option>
              {devOptions()}
            </select>
            <br></br>
            <input className="bug-report-btn " type="submit" value="Add" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDev;
