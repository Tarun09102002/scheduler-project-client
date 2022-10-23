import { useEffect, useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { Navbar } from './index'
import axios from 'axios'
import { format } from 'date-fns'

function MeetInvites() {
    const [invites, setInvites] = useState([])
    const fetchInvites = async () => {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/meet/invites/${sessionStorage.getItem('userid')}`)
        console.log(res.data)
        setInvites(res.data)
    }
    useEffect(() => {
        fetchInvites()
    }, [])

    const acceptInvite = async (meetId) => {
        console.log(meetId)
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/meet/accept/${sessionStorage.getItem('userid')}`, { meetId: meetId })
        // setInvites(res.data)
        console.log(res.data)
        fetchInvites()
    }

    return (
        <div>
            <Navbar></Navbar>
            {console.log(invites)}
            {invites.length !== 0 ?
                <div className='flex flex-col text-theme-colour mt-5'>
                    {invites?.map((invite, index) => {
                        return (
                            <div className='flex flex-row justify-around items-center p-4 bg-white border-y-2 border-theme-colour' key={index}>
                                <div className='flex flex-col'>
                                    <div className=' flex flex-row items-center'>
                                        <span className='text-xl font-bold '> {invite.title}</span>
                                        <div className='ml-3 text-lg '>created by <span className='underline'> {invite.createdby.name} </span></div>
                                    </div>
                                    <div className='flex flex-row'>
                                        <div className='text-lg mr-8'>{format(new Date(invite.date), 'do MMMM yyyy')}</div>
                                        <div className='text-lg '>{`${invite?.start === "0" ? 12 : (invite?.start > 12 ? (invite?.start - 12) : invite?.start)}:00 ${invite?.start >= 12 ? 'PM' : 'AM'} - ${invite?.end === "0" ? 12 : (invite?.end > 12 ? (invite?.end - 12) : invite?.end)}:00 ${invite?.end >= 12 ? 'PM' : 'AM'}`}</div>
                                    </div>
                                    <div className='text-lg'>{invite.description ? invite.description : ''}</div>
                                    <div className='flex flex-row'>
                                        Participants: {
                                            invite.participants.map((participant, index) => {
                                                return (
                                                    <div className='ml-2' key={index}>{participant.name}</div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className='flex flex-row'>
                                    <button className='bg-theme-colour text-white px-4 py-2 rounded-lg mr-8' onClick={() => acceptInvite(invite._id)}>Accept</button>
                                    <button className='bg-theme-colour text-white px-4 py-2 rounded-lg'>Decline</button>
                                </div>
                            </div>
                        )
                    })}
                </div> : <div className='text-theme-colour text-2xl font-bold mt-5 ml-5'>No Invites</div>}

        </div >
    )
}

export default MeetInvites