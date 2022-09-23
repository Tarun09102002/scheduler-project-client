import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Scheduler({ tasks }) {
    const navigate = useNavigate()
    const [eventDate, setEventDate] = useState([])
    const [scheduleDiv, setScheduleDiv] = useState()

    useEffect(() => {
        initialiseTask()
    }, [tasks])

    useEffect(() => {
        setScheduleDiv(initialiseScheduleDiv())
        scrollToDiv()
    }, [eventDate])


    const scrollToDiv = async () => {
        const time = new Date().getHours() - 1
        const div = document.getElementById(`div${time}`)
        const temp = document.getElementById(`temp`)
        if (div)
            div.scrollIntoView({ behavior: 'smooth' })
    }
    const initialiseTask = () => {
        const dates = []
        for (let i = 0; i < 24; i++) {
            dates.push([])
        }
        if (tasks) {
            for (const i in tasks) {
                for (let j = parseInt(tasks[i].start); j < (parseInt(tasks[i].end) === 0 ? 24 : parseInt(tasks[i].end)); j++) {
                    dates[j].push(tasks[i])
                }
            }
        }
        setEventDate(dates)
    }

    const initialiseScheduleDiv = () => {
        const elements = []
        for (let i = 0; i < 24; i++) {
            elements.push(
                <div className={`flex flex-row h-28  text-theme-colour relative border-black  border-t-2 border-opacity-20`} id={`div${i}`} key={i}>
                    <div className='w-2/12 px-2 py-2 border-black border-r-2 border-opacity-20'>
                        <div className='top-0 text-xl inline-block p-1 absolute -translate-y-[50%] bg-white pl-4 left-0'>
                            {i <= 12 ? `${i}` : `${i - 12}`}:00 {i < 12 ? 'AM' : 'PM'}
                        </div>
                    </div>
                    <div className={`flex flex-row justify-around items-center w-10/12 py-2 overflow-x-hidden`} >
                        {eventDate[i] && eventDate[i].map((task, index) => {
                            return <div key={index} className='w-[98%] mx-2 h-[95%] text-xl rounded-lg py-2 px-4 hover:cursor-pointer' style={{ backgroundColor: `${task ? task.color : 'white'}` }} onClick={() => task && navigate(`/task/${task.id}`)}>
                                {task ? task.title : "No event"}
                            </div>
                        })}
                    </div>
                </div>
            )
        }
        return (
            <div className='flex flex-col pt-3'>
                {elements}
            </div>
        )
    }



    return (
        <div id='temp' className='flex flex-col py-2 overflow-y-auto rounded-2xl max-h-[550px] bg-white drop-shadow-2xl' >
            {scheduleDiv ? scheduleDiv : null}
        </div>
    )
}


export default Scheduler