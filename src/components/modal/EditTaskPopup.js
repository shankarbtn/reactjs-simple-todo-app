import React, { useState,useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EditTaskPopup = ({ editPopupModal, editPopupToggle, updateTask, editItem }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [formError, setFormError] = useState({});

    useEffect(() => {
        if(editItem) {
            setTaskName(editItem.name);
            setTaskDescription(editItem.description);
        }
    }, [editItem]);

    const formIsValid = () => {
        let errors = {};
        let hasError = true;
        if(!taskName) {
            errors.name = "Task name is empty";
            hasError = false;
        }
        if(!taskDescription) {
            errors.description = "Task description is empty";
            hasError = false;
        }
        setFormError(errors);
        return hasError;
    };

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
        
        if(!formIsValid()) {
           return false;
        }

        let taskObj = {};
        taskObj["name"] = taskName;
        taskObj["description"] = taskDescription;
        taskObj["date"] = new Date().toLocaleString('en-US');
        updateTask(taskObj, editItem.id);
        setTaskName('');
        setTaskDescription('');
    };

    const handleCancel = () => {
        setTaskName('');
        setTaskDescription('');
        setFormError({});
        editPopupToggle();
    };

    return (
        <div>
            <Modal isOpen={editPopupModal} toggle={editPopupToggle}>
                <ModalHeader toggle={editPopupToggle}>UPDATE TASK</ModalHeader>
                <form onSubmit={handleUpdate}>
                    <ModalBody>
                            <div className="mb-3">
                                <label htmlFor="task-title" className="form-label">Task Name</label>
                                <input type="text" className="form-control" id="task-title" placeholder="Enter your title" value={taskName} name="task-name" onChange={handleChange} maxLength="50"/>
                                <small className="text-danger">{formError.name ? formError.name : null}</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="task-description" className="form-label">Task Decscription</label>
                                <textarea className="form-control" id="task-description" rows="5" placeholder="Enter your description" value={taskDescription} name="task-description" onChange={handleChange} maxLength="200"></textarea>
                                <small className="text-danger">{formError.description ? formError.description : null}</small>
                            </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary">UPDATE</Button>{' '}
                        <Button color="secondary" onClick={handleCancel}>CANCEL</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
};

export default EditTaskPopup;