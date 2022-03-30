import React, { useEffect, useState } from "react";
import Axios from "axios";

import "./BugsPage.css";

import Popup from "../CreateBug/CreateBug";
import DetailPopup from "../BugDetail/BugDetail";
import BugLists from "../BugLists/BugLists";
import ReportBtn from "../ReportBtn/ReportBtn";


//const BugsPage = ({ bugs }) => {
const BugsPage = () => {

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

    const fetchBugs = async () => {
        //const userID = localStorage.getItem("userID");
        const payload = {
          method: "GET",
        };
    
        try {
          const res = await fetch(
            `http://localhost:5000/bugs`,
            payload
          );
          const bug = await res.json();
          setIsLoaded(true);
          setGetBugs(bug);
          console.log(bug);
        } catch (err) {
          console.error(err);
        }
      };

    useEffect(() => {
        /*fetch("http://localhost:5000/bugs")
          .then((res) => res.json())
          .then(
              (bug) => {
                  setIsLoaded(true);
                  setGetBugs(bug);
              }
          );*/
        fetchBugs();
    }, []);

    return (
        <div className="bugs-wrapper">
            {getBugs.length > 0 ? (
                <div>
                    {/* <h2>{bugs.name}</h2> */}
                    <p>Bugs reported:</p>
                    <nav>
                        <ol>
                            <BugLists bugs={getBugs} toggleDetail={toggleDetail}/>
                        </ol>
                    </nav>
                    {/* <ReportBtn/> */}
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
                                <p/>
                                <br />
                                <input className="button" type="submit" value="Report" />
                            </form>
                        </>}
                        handleClose={togglePopup}
                    />}
                    {/* <ReportBtn/> */}
                </div>
            ) : (
                <div>
                    <h2>There is no bug</h2>
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
                                <p/>
                                <br />
                                <input className="button" type="submit" value="Report" />
                            </form>
                        </>}
                        handleClose={togglePopup}
                    />}
                </div>
            )}
        </div>
    );
};

export default BugsPage;
