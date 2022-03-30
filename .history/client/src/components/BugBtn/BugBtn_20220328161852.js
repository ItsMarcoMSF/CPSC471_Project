import React from 'react'



const BugBtn = ({bug, toggleDetail}) => {
    const toggleDetail = () => {
        setIsDetail(!isDetail);
    }

    return (
    <div>
        <input className="viewDetail"
            type="button"
            value= {bug.id + " - " + bug.name + " - " + bug.status}
            onClick={toggleDetail}
        />
        {isDetail && <DetailPopup
        content={<>
            <b>Bug's detail</b>
                <li key={bug.id}>
                    <p>{"id: " + bug.id}</p>
                    <p>{"name: " + bug.name}</p>
                    <p>{"description: " + bug.id}</p>
                    <p>{"priority: " + bug.name}</p>
                    <p>{"deadline: " + bug.id}</p>
                    <p>{"status: " + bug.name}</p>
                </li>
            </>}
            handleClose={toggleDetail}
        />}
    </div>
  )
}

export default BugBtn;