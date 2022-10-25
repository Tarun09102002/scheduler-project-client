import React from 'react'
import logo from '../images/calendarlogo.png'
import { IoNotificationsCircleSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import user from '../images/user.png'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Notifications } from './index'

function Navbar({ fetchTasks }) {
    const navigate = useNavigate()
    const [trigger, setTrigger] = useState(false)
    const [source, setSource] = useState()
    const [showNotification, setShowNotification] = useState(false)
    const [notification, setNotification] = useState([])
    const navContent = [
        { property: 'Home', link: '/' },
        { property: 'Add Event', link: '/addevent' },
        { property: 'Add Meet', link: '/addmeet' },
        { property: ' View Calendar', link: '/calendar' },
        { property: 'Meet Invites', link: '/invites' },
    ]
    const token = sessionStorage.getItem('userid')

    document.addEventListener('click', (e) => {
        if (e.target.id !== 'nav') {
            setTrigger(false)
        }
        if (!e.target.className.includes('notification') && e.target.id !== 'notif1' && e.target.id !== 'notif2' && e.target.id !== 'notif3') {
            setShowNotification(false)
        }
    })
    const getNotifications = async () => {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/notifications/${token}`)
        console.log(res.data)
        setNotification(res.data)
    }

    const acceptInvite = async (meetId) => {
        console.log(meetId)
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/meet/accept/${sessionStorage.getItem('userid')}`, { meetId: meetId })
        getNotifications()
        if (fetchTasks) {
            fetchTasks()
        }
    }
    const rejectInvite = async (meetId) => {
        console.log(meetId)
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/meet/reject/${sessionStorage.getItem('userid')}`, { meetId: meetId })
        getNotifications()
    }

    const clearNotification = async (notifId) => {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/clearnotification/${token}`, { notifId: notifId })
        console.log(res.data)
        getNotifications()
    }

    useEffect(() => {
        const getImage = async () => {
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/image/${token}`)
            console.log(res.data)
            setSource(res.data)
        }
        getImage()
        getNotifications()
        console.log(fetchTasks)
    }, [])

    return (
        <div className='z-50 flex flex-row py-4 justify-between w-full rounded-2xl bg-white drop-shadow-xl' >
            <div className='pl-5 flex flex-row items-center hover:cursor-pointer' onClick={() => navigate('/')}>
                <img src={logo} className="w-12 h-12" alt="" />
                <div className='font-bold text-2xl pl-2 md:visible invisible text-theme-colour'>Calendar</div>
            </div>
            <div className='flex flex-row mr-10 items-center'>
                <div className='mr-10 md:flex md:flex-col flex flex-col' id='notif3'>
                    <div className='flex flex-row items-center cursor-pointer' onClick={() => setShowNotification((prev) => !prev)}>
                        <span className='text-2xl text-theme-colour font-bold md:inline-block hidden' id='notif1'>Notification</span>
                        <IoNotificationsCircleSharp className={`w-10 h-8 ${notification.length > 0 ? 'text-red-500' : 'text-theme-colour'}`} id='notif2' />
                    </div>
                    {showNotification && <Notifications notification={notification} acceptInvite={acceptInvite} rejectInvite={rejectInvite} getNotifications={getNotifications} clearNotification={clearNotification} />}
                </div>
                {/* <div className='bg-theme-colour font-sans hover:cursor-pointer px-4 mr-10 text-center py-2 rounded-2xl text-xl text-white' onClick={() => navigate('/calendar')}>View Calendar</div>
                <div className='bg-theme-colour font-sans hover:cursor-pointer px-4 mr-10 text-center py-2 rounded-2xl text-xl text-white' onClick={() => navigate('/addevent')}>Add Task</div> */}
                <div className='flex flex-col w-12 md:w-auto md:mr-0 '>
                    <img id='nav' referrerPolicy='no-referrer' src={source ? source : user} alt="" className='w-12 rounded-full cursor-pointer' onClick={() => setTrigger((prev) => !prev)} />
                    <DropDown content={navContent} trigger={trigger} />
                </div>
            </div>
        </div>
    )
}

function DropDown(props) {
    const { content, trigger } = props
    const navigate = useNavigate()

    const logOut = () => {
        sessionStorage.clear()
        navigate('/login')
    }

    return (
        <div className={`absolute rounded-2xl bg-white  text-white shadow-l transform transition-all duration-100 ease-in-out py-5 h-auto top-16 right-10 ${trigger ? 'visible' : 'invisible'}`}>
            {content.map((item, index) => {
                return (
                    <div className='py-2 px-4 text-theme-colour hover:bg-theme-colour hover:text-white hover:cursor-pointer' key={index} onClick={() => navigate(`${item.link}`)}>{item.property}</div>
                )
            })}
            <div className='py-2 px-4 text-theme-colour hover:bg-theme-colour hover:text-white hover:cursor-pointer' onClick={logOut}>Log Out</div>
        </div>
    )
}

export default Navbar