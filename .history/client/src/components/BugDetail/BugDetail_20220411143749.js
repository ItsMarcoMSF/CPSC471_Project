import React from "react";
import "./BugDetail.css";

const DetailPopup = props => {
  return (
    <div className="detail-popup-box">
      <div className="detail-box detail-box-s">
        <span className="detail-close-icon detail-close-icon-s" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};

export default DetailPopup;