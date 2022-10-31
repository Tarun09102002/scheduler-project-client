import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TimePicker from 'react-time-picker'
import Select from 'react-select'
import { dummyData, tasks } from '../utils/data'
import logo from '../images/calendarlogo.png'
import axios from 'axios'


function EditTask() {
    const [data, setData] = useState({})
    const [end, setEnd] = useState('00:00')
    const { id } = useParams()
    const navigate = useNavigate()
    const colours = ['rgb(214, 239, 246)', 'rgb(186, 213, 240)', 'rgb(248, 215, 232)', 'rgb(203, 233, 195)']
    const time = [
        { label: "12:00 AM", value: "0" },
        { label: "1:00 AM", value: "1" },
        { label: "2:00 AM", value: "2" },
        { label: "3:00 AM", value: "3" },
        { label: "4:00 AM", value: "4" },
        { label: "5:00 AM", value: "5" },
        { label: "6:00 AM", value: "6" },
        { label: "7:00 AM", value: "7" },
        { label: "8:00 AM", value: "8" },
        { label: "9:00 AM", value: "9" },
        { label: "10:00 AM", value: "10" },
        { label: "11:00 AM", value: "11" },
        { label: "12:00 PM", value: "12" },
        { label: "1:00 PM", value: "13" },
        { label: "2:00 PM", value: "14" },
        { label: "3:00 PM", value: "15" },
        { label: "4:00 PM", value: "16" },
        { label: "5:00 PM", value: "17" },
        { label: "6:00 PM", value: "18" },
        { label: "7:00 PM", value: "19" },
        { label: "8:00 PM", value: "20" },
        { label: "9:00 PM", value: "21" },
        { label: "10:00 PM", value: "22" },
        { label: "11:00 PM", value: "23" },
    ]

    const onUpdate = (event) => {
        setData((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    const setColour = (index) => {
        setData((prev) => {
            return {
                ...prev,
                color: colours[index]
            }
        })
    }

    useEffect(() => {
        const getTask = async () => {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/specifictask/${id}`)
            setData(response.data.task)
        }
        getTask()
    }, [])

    const onSubmit = async () => {
        if (data && data.title && data.description && data.start && data.end && data.color) {
            const res = await axios.put(`${process.env.REACT_APP_SERVER_URL}/edit/tasks/${id}`, data)
            navigate(`/task/${id}`)
        }
    }

    return (
        <div className='flex flex-col items-center h-screen '>
            <div className='flex flex-row mt-8 w-full mb-5 justify-between rounded-2xl bg-white ' >
                <div className='pl-5 flex flex-row items-center hover:cursor-pointer' onClick={() => navigate('/')}>
                    <img src={logo} className="w-12 h-12" alt="" />
                    <div className='font-bold text-2xl pl-2 text-theme-colour'>Calendar</div>
                </div>
            </div>
            <div className='flex flex-col pt-4 pb-8 items-center rounded-2xl drop-shadow-2xl bg-white h-[85%] w-[60%]'>
                <div className='text-4xl font-bold font-sans text-theme-colour'>Edit an Event</div>
                <div className='flex flex-col items-center w-[80%] overflow-y-auto '>
                    <div className='flex flex-col justify-between w-[80%]'>
                        <div className='font-sans font-bold text-xl text-theme-colour mt-4'>Event Title</div>
                        <input type='text' className='border-2 border-theme-colour rounded-2xl mt-2 px-2 py-1' name='title' value={data.title} onChange={(event) => onUpdate(event)} />
                    </div>
                    <div className='flex flex-col w-[80%]'>
                        <div className='font-sans font-bold text-xl text-theme-colour mt-4'>Event Description</div>
                        <textarea className='border-2 border-theme-colour rounded-2xl mt-2 px-2 py-1' name='description' value={data.description} onChange={(event) => onUpdate(event)} />
                    </div>
                    <div className='flex flex-col w-[80%]'>
                        <div className='font-sans font-bold text-xl text-theme-colour mt-4'>Event Date</div>
                        <input type='date' className='border-2 border-theme-colour rounded-2xl mt-2 px-2 py-1' name='date' value={data.date} onChange={(event) => onUpdate(event)} />
                    </div>
                    <div className='flex flex-row text-theme-colour justify-start w-[80%]'>
                        <div className='flex flex-col'>
                            <div className='font-sans font-bold text-xl mr-5 text-theme-colour mt-4'>Event Start Time</div>
                            <Select options={time} placeholder="00:00 AM" className='text-theme-colour rounded-2xl w-auto mt-2 mr-4 py-1' onChange={(value) => setData((prevData) => {
                                return {
                                    ...prevData,
                                    start: value.value
                                }
                            })}></Select>
                        </div>
                        <div className='flex flex-col ml-6'>
                            <div className='font-sans font-bold text-xl text-theme-colour mt-4'>Event End Time</div>
                            <Select options={time} placeholder="00:00 AM" className='rounded-2xl w-auto mt-2  py-1' onChange={(value) => setData((prevData) => {
                                return {
                                    ...prevData,
                                    end: value.value
                                }
                            })}></Select>
                        </div>
                    </div>
                    <div className='flex flex-row justify-between w-[80%]'>
                        <div className='flex flex-col'>
                            <div className='font-sans font-bold text-xl text-theme-colour mt-4'>Event Background Colour</div>
                            <div className='flex flex-row'>
                                {colours.map((item, index) => {
                                    return (
                                        <div key={index} className={`w-20 h-12 hover:cursor-pointer rounded-lg mx-1 mt-2 ${data.color && data.color === item ? "drop-shadow-2xl border-2 border-theme-colour" : ""}`} style={{ backgroundColor: item }} onClick={() => setColour(index)}></div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='flex ml-0 mt-3 flex-row justify-start w-[80%]'>
                        <div onClick={onSubmit} className='bg-theme-colour font-sans hover:cursor-pointer px-4 text-center py-2 rounded-2xl text-xl text-white mt-4' >Edit Task</div>
                        <div className='bg-theme-colour font-sans hover:cursor-pointer px-4 text-center py-2 ml-8 rounded-2xl text-xl text-white mt-4' onClick={() => navigate(`/`)}>Cancel</div>
                    </div>
                </div>
            </div>
        </div>

    )
}

{/* <div className='flex flex-col'>
<div className='font-sans font-bold text-xl text-theme-colour mt-4'>Event Date</div>
<input type='date' className='border-2 border-theme-colour rounded-2xl w-[80%] mt-2 px-2 py-1' name='date' onChange={(event) => onUpdate(event)} />
</div> */}

export default EditTask