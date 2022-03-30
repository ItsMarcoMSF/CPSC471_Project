import React from 'react'

const BugBtn = ({bug, toggleDetail}) => {
  return (
    <div>
        <input className="viewDetail"
            type="button"
            value= {bug.id + " - " + bug.name + " - " + bug.status}
            onClick={toggleDetail}
        />
    </div>
  )
}

export default BugBtn;