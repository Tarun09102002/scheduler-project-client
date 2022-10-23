import React from 'react'

function Notifications({ notification, acceptInvite, rejectInvite }) {



    return (
        <div className={`absolute rounded-2xl bg-white  text-white shadow-l transform transition-all duration-100 w-60 ease-in-out py-5 h-auto top-16 right-36`}>
            {notification.length > 0 ? notification.map((item, index) => {
                return (
                    <div className='py-2 px-4 text-theme-colour text-center hover:cursor-pointer' key={index}>
                        <div className='flex flex-col'>
                            <span>{item.meet.createdby.name} invites you to a meet <span className='font-bold'>{item.meet.title}</span></span>
                            <div className='flex flex-row justify-around mt-3'>
                                <button className='bg-theme-colour text-white px-3 py-1 rounded-lg' onClick={() => acceptInvite(item.meet._id)}>Accept</button>
                                <button className='bg-theme-colour text-white px-3 py-1 rounded-lg'>Decline</button>
                            </div>
                        </div>
                    </div>
                )
            }) : <div className='py-2 px-4 text-theme-colour hover:bg-theme-colour hover:text-white hover:cursor-pointer'>No Notifications</div>}
        </div >
    )
}

export default Notifications