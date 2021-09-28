import React from 'react'
import Task from './Task'
//using hooks
//import {useState} from 'react'

// const tasks = [
// {
//     id: 1,
//     text: 'Doctors Appointment',
//     day: 'Feb 5th at 2:30pm',
//     reminder: true,
// },
// {
//     id: 2,
//     text: 'Shopping',
//     day: 'Feb 6th at 2:30pm',
//     reminder: true,
// },
// {
//     id: 3,
//     text: 'doc',
//     day: 'Feb 5th at 2:30pm',
//     reminder: false,
// },
// ]

const Tasks = ({tasks, onDelete, onToggle}) => {
    //while using usestate hooks declare here

    return (
        <>
            {tasks.map((task, index) => (
            // <h3 key={task.id}>{task.text}
            // </h3>
            <Task key={task.index} task={task} onDelete = {onDelete} onToggle ={onToggle} />
            ))}
        </>
    )
}

export default Tasks
