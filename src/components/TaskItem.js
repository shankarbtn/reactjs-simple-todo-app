import React from 'react';
import TaskCard from './TaskCard';

const TaskItem = (props) => {
    //useEffect(() => {
        const generateRandomColor = () => {
            let r = Math.random() * 255;
            let g = Math.random() * 255;
            let b = Math.random() * 255;
            return `rgba(${r},${g},${b}, 0.4)`;
        };
    //}, []);
    return (
        <>
            <div className="row row-cols-lg-4 row-cols-md-2 row-cols-1 g-3 px-5 pb-3">
                {props.taskList.length > 0 ? props.taskList.map((task, index) => (
                    <TaskCard key={index} taskitem={task} taskindex={index} handleEdit={props.handleEdit} handleDelete={props.handleDelete} bgcolor={generateRandomColor()}/>
                )) : <div className="col w-100">
                        <h2 className="fs-3 text-center">NO TASK YET !!!</h2>
                    </div>}
            </div>
        </>
    );
};

export default TaskItem;