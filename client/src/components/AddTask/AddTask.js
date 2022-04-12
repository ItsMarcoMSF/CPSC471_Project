import React, { useEffect, useState } from "react";

import "./AddTask.css";

const AddTask = (props) => {
  const [taskName, setTaskName] = useState("");
  const [taskDeadline, setTaskDeadline] = useState(new Date());
  const [taskStatus, setTaskStatus] = useState("");

  const resetForm = () => {
    setTaskName("");
    setTaskDeadline("");
    setTaskStatus("");
  };

  const createTask = async (e) => {
    const projID = props.id;
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
      props.handleClose();
      props.details();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="task-popup-box">
      <div className="task-box">
        <span className="task-close-icon" onClick={props.handleClose}>
          x
        </span>
        <form className="task-form" onSubmit={createTask}>
          <h2 className="task-form-header">Add A Task</h2>
          <label className="task-labels" htmlFor="name">
            Name
          </label>
          <br></br>
          <input
            type="text"
            name="name"
            id="inputID"
            placeholder="Task Name..."
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
          <br></br>
          <label className="task-labels" htmlFor="deadline">
            Deadline
          </label>
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
          <label className="task-labels" htmlFor="status">
            Status
          </label>
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
      </div>
    </div>
  );
};

export default AddTask;
