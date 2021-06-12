import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateTaskPopup = ({ modal, toggle, save }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [formError, setFormError] = useState({});

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

    const handleSave = (e) => {
        e.preventDefault();
        
        if(!formIsValid()) {
           return false;
        } 

        let taskObj = {};
        taskObj["name"] = taskName;
        taskObj["description"] = taskDescription;
        taskObj["date"] = new Date().toLocaleString('en-US');
        save(taskObj);
        setTaskName('');
        setTaskDescription('');
    };

    const handleCancel = () => {
        setTaskName('');
        setTaskDescription('');
        setFormError({});
        toggle();
    };

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>CREATE TASK</ModalHeader>
                <form onSubmit={handleSave}> 
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
                    <Button color="primary">CREATE</Button>{' '}
                    <Button color="secondary" onClick={handleCancel}>CANCEL</Button>
                </ModalFooter>
                </form>
            </Modal>
        </div>
    );
};

export default CreateTaskPopup;