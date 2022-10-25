import { useState, useEffect } from 'react'
import { Navbar } from './index'
import { addDays, subDays, format } from 'date-fns'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
import { dummyData } from '../utils/data'
import { Scheduler } from './index'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Home() {
    const [dateState, setDateState] = useState(new Date())
    const [tasks, setTasks] = useState()
    const [meets, setMeets] = useState()

    const fetchTasks = async () => {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/tasks/${sessionStorage.getItem('userid')}?date=${format(dateState, 'yyyy-MM-dd')}`)
        console.log(res.data)
        setTasks(res.data.events)
        setMeets(res.data.meets)
    }
    useEffect(() => {
        fetchTasks()
    }, [dummyData])

    useEffect(() => {
        fetchTasks()
    }, [dateState])



    return (
        <div className='flex flex-col pt-5 z-0 px-4 min-h-screen'>
            <Navbar fetchTasks={fetchTasks}></Navbar>
            <div className=' flex my-4 flex-row py-4 justify-between rounded-2xl bg-white drop-shadow-2xl pl-4' >
                <div className='ml-4 text-2xl font-sans font-bold text-theme-colour'>
                    {dateState.getDate()} {dateState.toLocaleString('default', { month: 'long' })}
                    <BsFillArrowLeftCircleFill className='inline-block ml-4 text-4xl text-theme-colour hover:cursor-pointer' onClick={() => setDateState(subDays(dateState, 1))} />
                    <BsFillArrowRightCircleFill className='inline-block ml-4 text-4xl text-theme-colour hover:cursor-pointer' onClick={() => setDateState(addDays(dateState, 1))} />
                </div>
            </div>
            <Scheduler tasks={tasks} meets={meets} />
        </div>
    )
}

export default Home