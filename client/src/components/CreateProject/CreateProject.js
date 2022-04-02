import React, { useState } from "react";

import "./CreateProject.css";

const CreateProject = ({ refreshProjects, switchStage }) => {
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("");

  const resetForm = () => {
    setName("");
    setDeadline("");
    setCategory("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = localStorage.getItem("userID");
    const newProject = {
      name: name,
      deadline: deadline,
      category: [category],
      manager: userID,
    };

    try {
      await fetch("http://localhost:5000/projects", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });
      resetForm();
      refreshProjects();
      switchStage();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-project">
      <h2>Create A Project</h2>
      <div className="create-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="inputID"
            placeholder="Project Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="deadline">Deadline</label>
          <input
            type="text"
            name="deadline"
            id="inputID"
            placeholder="Set a deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            id="inputID"
            placeholder="Set a Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <button className="project-submit-btn" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
