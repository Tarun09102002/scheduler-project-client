import { useState, useEffect } from 'react'
import { Navbar } from './index'
import { addDays, subDays, format } from 'date-fns'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
import { dummyData } from '../utils/data'
import { Scheduler } from './index'
import { useParams } from 'react-router-dom'

function Home() {
    const [dateState, setDateState] = useState(new Date())
    const [tasks, setTasks] = useState()
    const { date } = useParams()

    useEffect(() => {
        if (date) {
            setDateState(new Date(date))
        }
        setTasks(dummyData[format(dateState, 'yyyy-MM-dd')])
        console.log(format(dateState, 'yyyy-MM-dd'))
    }, [dummyData])

    useEffect(() => {
        setTasks(dummyData[format(dateState, 'yyyy-MM-dd')])
        console.log(format(dateState, 'yyyy-MM-dd'))
    }, [dateState])



    return (
        <div className='flex flex-col pt-5 px-4 min-h-screen'>
            <Navbar></Navbar>
            <div className='flex my-4 flex-row py-4 justify-between rounded-2xl bg-white drop-shadow-2xl pl-4' >
                <div className='ml-4 text-2xl font-sans font-bold text-theme-colour'>
                    {dateState.getDate()} {dateState.toLocaleString('default', { month: 'long' })}
                    <BsFillArrowLeftCircleFill className='inline-block ml-4 text-4xl text-theme-colour hover:cursor-pointer' onClick={() => setDateState(subDays(dateState, 1))} />
                    <BsFillArrowRightCircleFill className='inline-block ml-4 text-4xl text-theme-colour hover:cursor-pointer' onClick={() => setDateState(addDays(dateState, 1))} />
                </div>
            </div>
            <Scheduler tasks={tasks} />
        </div>
    )
}

export default Home