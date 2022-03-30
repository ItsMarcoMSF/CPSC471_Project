import React from "react";
import BugBtn from "../BugBtn/BugBtn";

const BugLists = ({bugs, toggleDetail}) => {
    return (
        <div>
            {bugs &&
            bugs.map((bug) => (
                // <li key={bug.id}>
                //                 <input className="viewDetail"
                //                     type="button"
                //                     value= {bug.id + " - " + bug.name + " - " + bug.status}
                //                     onClick={toggleDetail}
                //                 />
                // </li>
                <BugBtn bug={bug} toggleDetail={toggleDetail}/>
            ))}
        </div>
    );
};

export default BugLists;