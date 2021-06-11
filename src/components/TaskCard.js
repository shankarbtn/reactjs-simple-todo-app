import React from 'react';
import editicon from '../assets/edit-icon.png';
import trashicon from '../assets/trash-icon.png';

const TaskCard = ( {taskitem, taskindex, handleDelete, handleEdit, bgcolor} ) => {
    const deleteItem = (index) => {
        handleDelete(index);
    };

    const editItem = () => {
        let editObj = {};
        editObj["id"] = taskindex;
        editObj["name"] = taskitem.name;
        editObj["description"] = taskitem.description;
        handleEdit(editObj, taskindex);
    };

    const cardHeaderStyle = {
        border: `1px solid ${bgcolor}`
     };

    return (
        <div key={taskindex} className="col">
            <div className="card shadow h-100" style={cardHeaderStyle}>
                <h5 className="card-header" style={{ backgroundColor: bgcolor }}>{taskitem.name}</h5>
                <div className="card-body">
                    <p className="card-text">{taskitem.description}</p>
                </div>
                <div className="card-footer p-2 px-2">
                    <div className="float-left text-left font-weight-light dateDiv">{taskitem.date}</div>
                    <div className="float-right iconDiv">
                        <span className="cardBtn d-inline px-2">
                            <img src={editicon} alt="edit-icon" onClick={editItem} />
                        </span>
                        <span className="cardBtn d-inline px-2">
                            <img src={trashicon} alt="trash-icon" onClick={deleteItem} />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TaskCard;