import React from "react";

const BugLists = ({bugs, toggleDetail}) => {
    return (
        <div>
            {bugs &&
            bugs.map((bug) => (
                <li key={bug.id}>
                                <input className="viewDetail"
                                    type="button"
                                    value= {bug.id + " - " + bug.name + " - " + bug.status}
                                    onClick={toggleDetail}
                                />
                </li>
            ))}
        </div>
    );
};

export default BugLists;