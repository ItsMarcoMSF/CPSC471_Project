import React from "react";

import "./AddTask.css";

const AddTask = props =>{
    return(
      <div className ="popup-box">
        <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
        </div>
      </div>
    );
    };

export default AddTask;