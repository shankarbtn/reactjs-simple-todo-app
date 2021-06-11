import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateTaskPopup = ({ modal, toggle, save }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        if(name === 'task-name') {
            setTaskName(value);
        } else {
            setTaskDescription(value);
        }
    };

    const setTaskDate = () => {
        const now = new Date();
        return now.getUTCDate() +'/'+ now.getUTCMonth() +'/'+ now.getUTCFullYear() +' '+ now.getUTCHours() +':'+ now.getUTCMinutes() +':'+ now.getUTCSeconds(); 
    };

    const handleSave = () => {
        let taskObj = {};
        taskObj["name"] = taskName;
        taskObj["description"] = taskDescription;
        taskObj["date"] = setTaskDate();
        save(taskObj);
        setTaskName('');
        setTaskDescription('');
    };

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>CREATE TASK</ModalHeader>
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
                    <Button color="primary" onClick={handleSave}>CREATE</Button>{' '}
                    <Button color="secondary" onClick={toggle}>CANCEL</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default CreateTaskPopup;