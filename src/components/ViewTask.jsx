import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { tasks } from '../utils/data'
import { useState, useEffect } from 'react'
import logo from '../images/calendarlogo.png'

function ViewTask() {
    const [task, setTask] = useState()
    const [date, setDate] = useState()
    const navigate = useNavigate()
    const months = ['Janurary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const { id } = useParams()

    useEffect(() => {
        setTask(tasks[id])
    }, [id])

    useEffect(() => {
        if (task) {
            const dateTemp = new Date(task?.date)
            if (dateTemp)
                setDate(`${dateTemp.getDate()} ${months[dateTemp.getMonth()]} ${dateTemp.getFullYear()}`)
        }
    }, [task])

    return (
        <div className='flex flex-col items-center h-screen'>
            <div className='flex flex-row mt-8 w-full mb-5 justify-between rounded-2xl bg-white ' >
                <div className='pl-5 flex flex-row items-center hover:cursor-pointer' onClick={() => navigate('/')}>
                    <img src={logo} className="w-12 h-12" alt="" />
                    <div className='font-bold text-2xl pl-2 text-theme-colour'>Calendar</div>
                </div>
            </div>
            <div className={`h-[80%] justify-between flex flex-col pt-10 w-[50%] px-10 text-theme-colour rounded-2xl drop-shadow-xl`} style={{ backgroundColor: task && task.color }}>
                <div>
                    <div className='text-4xl font-bold'>{task && task.title}</div>
                    <div className='text-2xl uppercase mt-5'>{date}</div>
                    <div className='text-2xl mt-4'>{`${task?.start === "0" ? 12 : (task?.start > 12 ? (task?.start - 12) : task?.start)}:00 ${task?.start >= 12 ? 'PM' : 'AM'} - ${task?.end === "0" ? 12 : (task?.end > 12 ? (task?.end - 12) : task?.end)}:00 ${task?.end >= 12 ? 'PM' : 'AM'}`}</div>
                    <div className='text-2xl mt-12'>{task?.description}</div>
                </div>
                <div className='flex ml-0 mb-24 flex-row justify-start w-[80%]'>
                    <div className='bg-theme-colour font-sans hover:cursor-pointer px-4 text-center py-2 rounded-2xl text-xl text-white mt-4' >Edit Task</div>
                    <div className='bg-theme-colour font-sans hover:cursor-pointer px-4 text-center py-2 ml-8 rounded-2xl text-xl text-white mt-4' >Delete Task</div>
                </div>
            </div>
        </div>
    )
}

export default ViewTask