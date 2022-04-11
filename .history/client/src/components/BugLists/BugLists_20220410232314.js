import React from "react";
import BugBtn from "../BugBtn/BugBtn";

const BugLists = ({bugs, toggleDetail, fetchBugs}) => {
    return (
        <div>
            {bugs &&
            bugs.map((bug) => (
                <BugBtn bug={bug} toggleDetail={toggleDetail} fetchBugs={fetchBugs}/>
            ))}
        </div>
    );
};

export default BugLists;