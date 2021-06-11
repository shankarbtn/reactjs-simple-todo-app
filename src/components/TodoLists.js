import React, { useState, useEffect } from 'react';
import CreateTaskPopup from './modal/CreateTaskPopup';
import EditTaskPopup from './modal/EditTaskPopup';
import TaskItem from './TaskItem';

const TodoLists = () => {
    const [modal, setModal] = useState(false);
    const [editPopupModal, setEditPopupModal] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [editTaskItem, setEditTaskItem] = useState('');

    useEffect(() => {
        let localStorageData = localStorage.getItem('__TODO_TASK_DATA__');
        if(localStorageData) {
            let dataArr = JSON.parse(localStorageData);
            setTaskList(dataArr);
        }
    }, []);

    const toggle = () => setModal(!modal);
    const editPopupToggle = () => setEditPopupModal(!editPopupModal);

    const saveTask = (taskObj) => {
        let tempTaskList = taskList;
        tempTaskList.unshift(taskObj);
        localStorage.setItem('__TODO_TASK_DATA__', JSON.stringify(tempTaskList));
        setTaskList(tempTaskList);
        toggle();
    };

    const updateTask = (taskObj, editIndex) => {
        let tempTaskList = taskList;
        tempTaskList[editIndex] = taskObj;
        localStorage.setItem('__TODO_TASK_DATA__', JSON.stringify(tempTaskList));
        setTaskList(tempTaskList);
        setEditTaskItem('');
        editPopupToggle(false);
        //window.location.reload();
    };

    const handleEdit = (editObj) => {
        setEditTaskItem(editObj);
        editPopupToggle();
    };

    const handleDelete = (index) => {
        let tempTaskList = taskList;
        tempTaskList.splice(index, 1);
        localStorage.setItem('__TODO_TASK_DATA__', JSON.stringify(tempTaskList));
        setTaskList(tempTaskList);
        window.location.reload();
    };
    return (
        <>
            <section className="header-section text-center">
                <h2>TODO APPLICATION</h2>
                <button className="btn btn-primary mt-3" onClick={toggle}>CREATE TASK</button>
            </section>
            <section className="task-section mt-3 pd-3">
                <TaskItem taskList={taskList} editPopupModal={editPopupModal} editPopupToggle={editPopupToggle} handleEdit={handleEdit} handleDelete={handleDelete} editItem={editTaskItem}/>
            </section>
            <CreateTaskPopup modal={modal} toggle={toggle} save={saveTask}/>
            <EditTaskPopup editPopupModal={editPopupModal} editPopupToggle={editPopupToggle} updateTask={updateTask} editItem={editTaskItem}/>
        </>
    );
};

export default TodoLists;