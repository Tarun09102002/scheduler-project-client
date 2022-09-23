import { useState } from 'react'
import logo from '../images/calendarlogo.png'
import registerImage from '../images/register_image.jpg'
import InputCustom from './InputBox'
import { useNavigate } from 'react-router-dom'

function Register() {
    const [userInfo, setUserInfo] = useState({})
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(userInfo)
    }

    return (
        <div className='flex md:flex-row flex-col h-[100vh] items-center w-full justify-between'>
            <div className='w-3/5'>
                <img src={registerImage} alt="" />
            </div>
            <div className='flex flex-col items-center w-3/5 mb-20'>
                <img src={logo} className="w-20 h-20" alt="" />
                <div className='font font-sans text-4xl font-bold text-[#543F9D] mt-8'>REGISTER</div>
                <InputCustom placeholder="Name" field={userInfo} setField={setUserInfo} name="Name"></InputCustom>
                <InputCustom placeholder="Username" field={userInfo} setField={setUserInfo} name="Username"></InputCustom>
                <InputCustom placeholder="Email" field={userInfo} setField={setUserInfo} name="Email"></InputCustom>
                <InputCustom placeholder="Password" field={userInfo} setField={setUserInfo} name="Password"></InputCustom>
                <div className='flex flex-col items-center'>
                    <div className='hover:cursor-pointer px-4  rounded-lg text-xl mb-2 text-[#543F9D]' onClick={() => navigate('/login')}>Already have an account?</div>
                    <div className='bg-[#543F9D] hover:cursor-pointer px-4 w-28 text-center py-2 rounded-lg text-xl text-white' onClick={handleSubmit}>Register</div>
                </div>
            </div>
        </div>
    )
}

export default Register