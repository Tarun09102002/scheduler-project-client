import React from 'react'
import logo from '../images/calendarlogo.png'
import bgImg from "../images/home_image.png"
import { useNavigate } from 'react-router-dom'

function StartUpPage() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const current = new Date()
    const date = current.getDate()
    const month = months[current.getMonth()]
    const day = days[current.getDay()]
    const navigate = useNavigate()
    const handleClick = (page) => {
        navigate(`/${page}`)
    }
    return (
        <div className='flex flex-col justify-between h-[100vh]'>
            <div className="flex flex-row mt-5 justify-between font-['Poppins']">
                <div className='pl-5 flex flex-row items-center '>
                    <img src={logo} className="w-12 h-12" alt="" />
                    <div className='font-bold text-2xl pl-2 text-theme-colour'>Calendar</div>
                </div>
                <div className='pr-5 flex flex-row items-center text-white'>
                    <div className="bg-[#C0A6EE] hover:cursor-pointer px-4 w-28 text-center py-2 rounded-lg text-xl" onClick={() => handleClick('login')}>Login</div>
                    <div className="bg-[#3A91F8] hover:cursor-pointer px-4 ml-8 py-2 w-28 text-center rounded-lg text-xl" onClick={() => handleClick('register')}>Register</div>
                </div>
            </div>
            <div className='flex lg:flex-row flex-col h-[90vh] w-full lg:justify-between lg:text-left text-center items-center lg:items-start'>
                <div className='flex flex-col py-40 font-["Roboto"] lg:pl-28'>
                    <div className='text-black text-9xl'>{date}</div>
                    <div className='text-[#065BC3] uppercase font-bold text-6xl pl-2'>{month}</div>
                    <div className='text-[#2F53C4] capitalize font-bold text-4xl pl-3 mt-4'>{day}</div>
                </div>
                <div className='lg:pr-8'>
                    <img src={bgImg} className="h-[700px]" alt="" />
                </div>
            </div>
        </div>
    )
}

export default StartUpPage