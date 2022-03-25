import React, { useEffect, useState } from "react";
import Axios from "axios";

import "./BugsPage.css";

import Popup from "../CreateBug/CreateBug";
import DetailPopup from "../BugDetail/BugDetail";


const BugsPage = ({ bugs }) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [getBugs, setGetBugs] = useState([]);
    
    const [isOpen, setIsOpen] = useState(false);
    const [isDetail, setIsDetail] = useState(false);

    const [sendBug, setSendBug] = useState({
        id: "",
        name: "",
        description: "",
        priority: "",
        deadline: "",
        status: "",
    });

    function handle(e) {
        const newbug = {...sendBug}
        newbug[e.target.id] = e.target.value
        setSendBug(newbug)
        console.log(newbug)
    }

    function reportBug(e) {
        e.preventDefault();
        Axios.post("http://localhost:5000/bugs", {
            id: sendBug.id,
            name: sendBug.name,
            description: sendBug.description,
            priority: sendBug.priority,
            deadline: sendBug.deadline,
            status: sendBug.status
        })
            .then(res => {
                console.log(res.data)
            })
    }
 

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const toggleDetail = () => {
        setIsDetail(!isDetail);
    }

    useEffect(() => {
          fetch("http://localhost:5000/bugs")
            .then((res) => res.json())
            .then(
                (bug) => {
                    setIsLoaded(true);
                    setGetBugs(bug);
                }
            );
    });

    var index = 1;

    return (
        <div className="bugs-wrapper">
            {bugs ? (
                <div>
                    <h2>{bugs.name}</h2>
                    <p>Bugs reported:</p>
                    <nav>
                        <ol start={index}>
                            {getBugs.map(bug => (
                            <li key={bug.id}>
                                <input className="viewDetail"
                                    type="button"
                                    value= {bug.id + " - " + bug.name + " - " + bug.status}
                                    onClick={toggleDetail}
                                />
                            </li>
                            ))}
                        </ol>
                    </nav>
                    {isDetail && <DetailPopup
                        content={<>
                            <b>Bug's detail</b>
                            {getBugs.map(bug => (
                                <li key={bug.id}>
                                    <p>{"id: " + bug.id}</p>
                                    <p>{"name: " + bug.name}</p>
                                    <p>{"description: " + bug.id}</p>
                                    <p>{"priority: " + bug.name}</p>
                                    <p>{"deadline: " + bug.id}</p>
                                    <p>{"status: " + bug.name}</p>
                                </li>
                            ))}
                        </>}
                        handleClose={toggleDetail}
                    />}
                    <input
                        type="button"
                        value="Report new bug"
                        onClick={togglePopup}
                    />
                    {isOpen && <Popup
                        content={<>
                            <b>Report a new bug</b>
                            <p>Enter details about new bugs here</p>
                            <form onSubmit={(e) => reportBug(e)}>
                                <p>Bug id</p>
                                <input
                                value={sendBug.bid}
                                onChange={(e) => handle(e)}
                                id="id"
                                type="number"
                                />
                                <p>Bug name</p>
                                <input
                                value={sendBug.name}
                                onChange={(e) => handle(e)}
                                id="name"
                                type="text"
                                />
                                <p>Bug description</p>
                                <input
                                value={sendBug.description}
                                onChange={(e) => handle(e)}
                                id="description"
                                type="text"
                                />
                                <p>Bug priority</p>
                                <input
                                value={sendBug.priority}
                                onChange={(e) => handle(e)}
                                id="priority"
                                type="text"
                                />
                                <p>Bug deadline</p>
                                <input
                                value={sendBug.deadline}
                                onChange={(e) => handle(e)}
                                id="deadline"
                                type="date"
                                />
                                <p>Bug status</p>
                                <input
                                value={sendBug.status}
                                onChange={(e) => handle(e)}
                                id="status"
                                type="text"
                                />
                                <br />
                                <input className="button" type="submit" value="Report" />
                            </form>
                        </>}
                        handleClose={togglePopup}
                    />}
                </div>
            ) : (
                <h2>There is no bug</h2>
            )}
        </div>
    );
};

export default BugsPage;
