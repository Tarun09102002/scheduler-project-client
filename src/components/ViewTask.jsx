import React from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { tasks } from '../utils/data'
import { useState, useEffect } from 'react'
import logo from '../images/calendarlogo.png'
import axios from 'axios'

function ViewTask() {
    const [task, setTask] = useState()
    const [date, setDate] = useState()
    const navigate = useNavigate()
    const [isMeet, setIsMeet] = useState(false)
    const [completed, setCompleted] = useState(task?.completed)
    const months = ['Janurary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const { id } = useParams()

    const getTask = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/specifictask/${id}`)
        setTask(response.data.task)
    }
    const handleComplete = (complete) => {
        setCompleted(complete)
        // console.log(complete)
        axios.put(`${process.env.REACT_APP_SERVER_URL}/complete/${id}`, {
            completed: complete
        })
            .then(res => {
                navigate(`/${task.date}`)
            })
            .catch(err => {
                // (err)
            })
    }

    const handleDelete = () => {
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/delete/${id}`)
            .then(res => {
                navigate(`/${task.date}`)
            })
            .catch(err => {
                console.log(err)

            })

    }

    useEffect(() => {

        // setTask(tasks[id])
        getTask()
    }, [id])

    useEffect(() => {
        setCompleted(task?.completed)
    }, [task])

    useEffect(() => {
        if (task) {
            setIsMeet(task.link && true)
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
            <div className={`min-h-[80%] h-auto justify-between flex flex-col pt-10 w-[95%] md:w-[50%] px-10 text-theme-colour rounded-2xl drop-shadow-xl`} style={{ backgroundColor: task && task.color }}>
                <div>
                    <div className='text-4xl font-bold'>{task && task.title}</div>
                    <div className='text-2xl uppercase mt-5 hover:cursor-pointer' onClick={() => {
                        navigate(`/${task.date}`)
                    }}>{date}</div>
                    <div className='text-2xl mt-4'>{`${task?.start === "0" ? 12 : (task?.start > 12 ? (task?.start - 12) : task?.start)}:00 ${task?.start >= 12 ? 'PM' : 'AM'} - ${task?.end === "0" ? 12 : (task?.end > 12 ? (task?.end - 12) : task?.end)}:00 ${task?.end >= 12 ? 'PM' : 'AM'}`}</div>
                    {isMeet && <div className='text-2xl mt-4'>Link: <a href={task.link}>{task.link}</a></div>}
                    <div className='text-2xl mt-12'>{task?.description}</div>
                    {isMeet &&
                        <div className='mt-10 flex flex-col'>
                            Participants:
                            {task.participants.map((participant, index) => {
                                return (
                                    <div key={index} className='text-2xl mt-2'>{participant.username}</div>
                                )
                            })}
                        </div>
                    }
                </div>
                <div className='flex ml-0 mb-24 md:flex-row flex-col justify-start items-center md:w-[80%] w-full'>
                    <div onClick={() => navigate(`/edit/${task._id}`)} className='bg-theme-colour md:w-auto w-3/5 font-sans hover:cursor-pointer px-4 text-center py-2 rounded-2xl text-xl text-white mt-4' >Edit Task</div>
                    <div onClick={() => handleDelete()} className='bg-theme-colour font-sans hover:cursor-pointer w-3/5 md:w-auto px-4 text-center py-2 md:ml-8 rounded-2xl text-xl text-white mt-4' >Delete {isMeet ? 'Meet' : 'Task'}</div>
                    <div onClick={() => handleComplete(completed ? false : true)} className='bg-theme-colour font-sans w-3/5 md:w-auto hover:cursor-pointer px-4 text-center py-2 md:ml-8 rounded-2xl text-xl text-white mt-4' >{!completed ? `Complete ${isMeet ? 'Meet' : 'Task'}` : `Pending ${isMeet ? 'Meet' : 'Task'}`}</div>
                </div>
            </div>
        </div>
    )
}

export default ViewTask