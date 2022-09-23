import React from 'react'
import logo from '../images/calendarlogo.png'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()
    return (
        <div className='flex flex-row py-4 justify-between rounded-2xl bg-white drop-shadow-xl' >
            <div className='pl-5 flex flex-row items-center hover:cursor-pointer' onClick={() => navigate('/')}>
                <img src={logo} className="w-12 h-12" alt="" />
                <div className='font-bold text-2xl pl-2 text-theme-colour'>Calendar</div>
            </div>
            <div className='flex flex-row'>
                <div className='bg-theme-colour font-sans hover:cursor-pointer px-4 mr-10 text-center py-2 rounded-2xl text-xl text-white' onClick={() => navigate('/calendar')}>View Calendar</div>
                <div className='bg-theme-colour font-sans hover:cursor-pointer px-4 mr-10 text-center py-2 rounded-2xl text-xl text-white' onClick={() => navigate('/addevent')}>Add Task</div>
            </div>
        </div>
    )
}

export default Navbar