import React, { useState } from "react";
import Axios from "axios";

import "./ReportBtn.css"
import Popup from "../CreateBug/CreateBug";

const ReportBtn = () => {
    const [isOpen, setIsOpen] = useState(false);

    // const togglePopup = () => {
    //     setIsOpen(!isOpen);
    // }

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
}

export default ReportBtn;