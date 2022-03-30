import React from "react";
import "./BugDetail.css";

const DetailPopup = props => {
  return (
    <div className="detail-popup-box">
      <div className="detail-box">
        <span className="detail-close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};

export default DetailPopup;