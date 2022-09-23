import { useState } from 'react'
import logo from '../images/calendarlogo.png'
import loginImage from '../images/login_image.jpg'
import InputCustom from './InputBox'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [userInfo, setUserInfo] = useState({})
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <div className='flex md:flex-row flex-col h-[100vh] items-center w-full justify-between'>
            <div className='flex flex-col items-center w-3/5 mb-20'>
                <img src={logo} className="w-20 h-20" alt="" />
                <div className='font font-sans text-4xl font-bold text-[#543F9D] mt-8'>LOGIN</div>
                <InputCustom placeholder="Username" field={userInfo} setField={setUserInfo} name="Username"></InputCustom>
                <InputCustom placeholder="Password" field={userInfo} setField={setUserInfo} name="Password"></InputCustom>
                <div className='flex flex-col items-center'>
                    <div className='hover:cursor-pointer text-xl mb-8 text-[#543F9D]' onClick={() => navigate('/register')}>Don't have an account?</div>
                    <div className='bg-[#543F9D] hover:cursor-pointer px-4 w-28 text-center py-2 rounded-lg text-xl text-white' onClick={handleSubmit}>Login</div>
                </div>
            </div>
            <div className='w-3/5'>
                <img src={loginImage} alt="" />
            </div>
        </div>
    )
}

export default Login