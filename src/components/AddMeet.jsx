import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import logo from '../images/calendarlogo.png'
import axios from 'axios'


function AddMeet() {
    const [data, setData] = useState({})
    const [participants, setParticipants] = useState([])
    const [participantName, setParticipantName] = useState('')
    const [error, setError] = useState('')
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

    const onSubmit = async () => {
        data.participants = participants
        console.log('here')
        if (data && data.title && data.date && data.start && data.end && data.link) {
            console.log(data)
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/add/meet/${sessionStorage.getItem('userid')}`, data)
            console.log(res.data)
            if (res.data.message === 'unsuccessful') {
                const { unavailableUsers } = res.data
                let string = `${unavailableUsers[0]}`
                console.log(unavailableUsers)
                for (let i = 1; i < unavailableUsers.length; i++) {
                    string += ', ' + unavailableUsers[i]
                }
                setError(`The following users does not exist: ${string}`)
            }
            else {
                navigate(`/${data.date}`)
            }
        }
        else {
            setError('Please fill all the fields')
        }
    }

    useEffect(() => {
        setColour(0)
    }, [])

    return (
        <div className='flex flex-col items-center min-h-screen '>
            <div className='flex flex-row mt-8 w-full mb-5 justify-between rounded-2xl bg-white ' >
                <div className='pl-5 flex flex-row items-center hover:cursor-pointer' onClick={() => navigate('/')}>
                    <img src={logo} className="w-12 h-12" alt="" />
                    <div className='font-bold text-2xl pl-2 text-theme-colour'>Calendar</div>
                </div>
            </div>
            <div className='flex flex-col pt-4 pb-8 items-center rounded-2xl drop-shadow-2xl bg-white h-[85%] md:w-[60%] w-[95%]'>
                <div className='text-4xl font-bold font-sans text-theme-colour'>Add a Meet</div>
                <div className='flex flex-col items-center md:w-[80%] w:[100%] overflow-y-auto '>
                    <div className='flex flex-col justify-between w-[80%]'>
                        <div className='font-sans font-bold text-xl text-theme-colour mt-4'>Meet Title</div>
                        <input type='text' className='border-2 border-theme-colour rounded-2xl mt-2 px-2 py-1' name='title' onChange={(event) => onUpdate(event)} />
                    </div>
                    <div className='flex flex-col justify-between w-[80%]'>
                        <div className='font-sans font-bold text-xl text-theme-colour mt-4'>Meet Link</div>
                        <input type='text' className='border-2 border-theme-colour rounded-2xl mt-2 px-2 py-1' name='link' onChange={(event) => onUpdate(event)} />
                    </div>
                    <div className='flex flex-col w-[80%]'>
                        <div className='font-sans font-bold text-xl text-theme-colour mt-4'>Meet Description</div>
                        <textarea className='border-2 border-theme-colour rounded-2xl mt-2 px-2 py-1' name='description' onChange={(event) => onUpdate(event)} />
                    </div>
                    <div className='flex flex-col w-[80%]'>
                        <div className='font-sans font-bold text-xl text-theme-colour mt-4'>Meet Participants (Add Username or Email) </div>
                        <div className='flex flex-row items-center'>
                            <input type='text' className='border-2 border-theme-colour w-[80%] rounded-2xl mt-2 px-2 py-1' name='meet' onChange={(event) => setParticipantName(event.target.value)} value={participantName} />
                            <button className='bg-theme-colour text-white rounded-2xl w-[20%] px-2 py-1 ml-2' onClick={() => {
                                if (participantName) {
                                    setParticipants((prev) => {
                                        return [...prev, participantName]
                                    })
                                    setParticipantName('')
                                }
                            }}>Add</button>
                        </div>
                        <div className='flex flex-row w-full flex-wrap max-h-28 overflow-y-auto'>
                            {participants.map((participant, index) => {
                                return (
                                    <div className='flex flex-row items-center justify-center rounded-2xl bg-purple-100 text-theme-colour px-2 py-1 mt-2 mr-2' key={index}>
                                        <div className='bg-theme-colour mr-3 text-purple-100 px-2 rounded-full cursor-pointer' onClick={() => {
                                            setParticipants((prev) => {
                                                return prev.filter((item, i) => i !== index)
                                            })
                                        }}>x</div> <div className='mr-2'>{participant} </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='flex flex-col w-[80%]'>
                        <div className='font-sans font-bold text-xl text-theme-colour mt-4'>Meet Date</div>
                        <input type='date' className='border-2 border-theme-colour rounded-2xl mt-2 px-2 py-1' name='date' onChange={(event) => onUpdate(event)} />
                    </div>
                    <div className='flex flex-row justify-center text-theme-colour md:justify-start md:w-[80%] w-[95%]'>
                        <div className='flex flex-col'>
                            <div className='font-sans font-bold text-xl mr-5 text-theme-colour mt-4'>Meet Start Time</div>
                            <Select options={time} placeholder="00:00 AM" className='text-theme-colour rounded-2xl w-auto mt-2 mr-4 py-1' onChange={(value) => setData((prevData) => {
                                return {
                                    ...prevData,
                                    start: value.value
                                }
                            })}></Select>
                        </div>
                        <div className='flex flex-col ml-6'>
                            <div className='font-sans font-bold text-xl text-theme-colour mt-4'>Meet End Time</div>
                            <Select options={time} placeholder="00:00 AM" className='rounded-2xl w-auto mt-2  py-1' onChange={(value) => setData((prevData) => {
                                return {
                                    ...prevData,
                                    end: value.value
                                }
                            })}></Select>
                        </div>
                    </div>
                    <div className='flex flex-row justify-between md:ml-0 ml-5 md:w-[80%] w-[95%]'>
                        <div className='flex flex-col'>
                            <div className='font-sans font-bold text-xl text-theme-colour mt-4'>Meet Background Colour</div>
                            <div className='flex flex-row'>
                                {colours.map((item, index) => {
                                    return (
                                        <div key={index} className={`w-20 h-12 hover:cursor-pointer rounded-lg mx-1 mt-2 ${data.color && data.color === item ? "drop-shadow-2xl border-2 border-theme-colour" : ""}`} style={{ backgroundColor: item }} onClick={() => setColour(index)}></div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    {error && <div className='text-red-500 font-bold text-md w-[80%] mt-2'>{error}</div>}
                    <div className='flex ml-0 mt-3 flex-row justify-start w-[80%]'>
                        <div className='bg-theme-colour font-sans hover:cursor-pointer px-4 text-center py-2 rounded-2xl text-xl text-white mt-4' onClick={() => onSubmit()}>Add Meet</div>
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

export default AddMeet