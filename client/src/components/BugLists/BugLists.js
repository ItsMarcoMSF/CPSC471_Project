import React from "react";
import BugBtn from "../BugBtn/BugBtn";

const BugLists = ({bugs, toggleDetail}) => {
    return (
        <div>
            {bugs &&
            bugs.map((bug) => (
                <BugBtn bug={bug} toggleDetail={toggleDetail}/>
            ))}
        </div>
    );
};

export default BugLists;