import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function EventsToday({ tasks, date }) {
    const navigate = useNavigate()
    const [eventDate, setEventDate] = useState()
    const initialiseTask = () => {
        const dates = []
        for (let i = 0; i < 24; i++) {
            dates.push([])
        }
        if (tasks) {
            for (const i in tasks) {
                dates[tasks[i].start].push(tasks[i])
            }
        }
        setEventDate(dates)
    }

    useEffect(() => {
        initialiseTask()
    }, [tasks])

    function EventDiv() {
        return (
            <div className='flex flex-col'>
                {eventDate && eventDate.map((task, index) => {
                    return <div key={index}>
                        {
                            task && task.map((taskSpecific, ind) => {
                                return (
                                    <div key={ind} className='flex flex-col mb-5'>
                                        <div className='text-2xl'>{taskSpecific.title}</div>
                                        <div className='text-xl'>{`${taskSpecific?.start === "0" ? 12 : (taskSpecific?.start > 12 ? (taskSpecific?.start - 12) : taskSpecific?.start)}:00 ${taskSpecific?.start >= 12 ? 'PM' : 'AM'} - ${taskSpecific?.end === "0" ? 12 : (taskSpecific?.end > 12 ? (taskSpecific?.end - 12) : taskSpecific?.end)}:00 ${taskSpecific?.end >= 12 ? 'PM' : 'AM'}`}</div>

                                    </div>
                                )
                            })
                        }
                    </div>
                })}
            </div>
        )
    }

    return (
        <div className='w-1/3 ml-5 rounded-2xl flex flex-col justify-between text-white px-4 pt-4 overflow-y-auto shadow-2xl bg-theme-colour h-[600px] mr-10'>
            <div className='text-2xl pb-4'>Events:</div>
            {!tasks ? <div className='text-2xl'>No tasks for the day!</div> : <EventDiv />}
            <div className='bg-white px-2 py-2 hover:cursor-pointer text-theme-colour w-2/5 mb-8 rounded-lg text-lg font-semibold text-center' onClick={() => { navigate(`/${date}`) }}>View in Detail</div>
        </div>
    )
}

export default EventsToday