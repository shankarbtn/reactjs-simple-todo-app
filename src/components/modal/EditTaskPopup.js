import React, { useState,useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EditTaskPopup = ({ editPopupModal, editPopupToggle, updateTask, editItem }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    useEffect(() => {
        if(editItem) {
            setTaskName(editItem.name);
            setTaskDescription(editItem.description);
        }
    }, [editItem]);

    const handleChange = (e) => {
        const { name, value } = e.target; 
        if(name === 'task-name') {
            setTaskName(value);
        } else {
            setTaskDescription(value);
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        let taskObj = {};
        taskObj["name"] = taskName;
        taskObj["description"] = taskDescription;
        taskObj["date"] = new Date().toLocaleString('en-US');
        updateTask(taskObj, editItem.id);
        setTaskName('');
        setTaskDescription('');
    };

    return (
        <div>
            <Modal isOpen={editPopupModal} toggle={editPopupToggle}>
                <ModalHeader toggle={editPopupToggle}>UPDATE TASK</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="task-title" className="form-label">Task Name</label>
                            <input type="text" className="form-control" id="task-title" placeholder="Enter your title" value={taskName} name="task-name" onChange={handleChange} maxLength="50"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="task-description" className="form-label">Task Decscription</label>
                            <textarea className="form-control" id="task-description" rows="5" placeholder="Enter your description" value={taskDescription} name="task-description" onChange={handleChange} required maxLength="200"></textarea>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleUpdate}>UPDATE</Button>{' '}
                    <Button color="secondary" onClick={editPopupToggle}>CANCEL</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default EditTaskPopup;