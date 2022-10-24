import { useState } from 'react'
import logo from '../images/calendarlogo.png'
import registerImage from '../images/register_image.jpg'
import InputCustom from './InputBox'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

function Register() {
    const [userInfo, setUserInfo] = useState({})
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [image, setImage] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!userInfo.Username || !userInfo.Email || !userInfo.Password || !userInfo.Name) {
            setError('Please fill all the fields')
        }
        else if (userInfo.Password !== userInfo.confirmPassword) {
            setError('Password and Confirm Password should be same')
        }
        else {
            setError('')
            const formData = new FormData()
            formData.append('Username', userInfo.Username)
            formData.append('Email', userInfo.Email)
            formData.append('Password', userInfo.Password)
            formData.append('Name', userInfo.Name)
            formData.append('Image', image)
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/register`, formData)
            if (res.data.message === 'unsuccessful') {
                setError('Username or Email already exists')
            }
            else {
                navigate('/login')
            }
        }
    }
    useEffect(() => {
        console.log(image)
    }, [image])

    return (
        <div className='flex md:flex-row flex-col-reverse min-h-[100vh] items-center w-full justify-between'>
            <div className='md:w-3/5'>
                <img src={registerImage} alt="" />
            </div>
            <form className='flex flex-col mb-5 md:mt-0 mt-10 items-center md:w-3/5 md:mb-20' onSubmit={handleSubmit}>
                <img src={logo} className="w-20 h-20" alt="" />
                <div className='font font-sans text-4xl font-bold text-[#543F9D] mt-8'>REGISTER</div>
                <InputCustom placeholder="Name" field={userInfo} setField={setUserInfo} name="Name"></InputCustom>
                <InputCustom placeholder="Username" field={userInfo} setField={setUserInfo} name="Username"></InputCustom>
                <InputCustom placeholder="Email" field={userInfo} setField={setUserInfo} name="Email"></InputCustom>
                {/* <InputCustom placeholder="Password" field={userInfo} setField={setUserInfo} name="Password"></InputCustom> */}
                <input placeholder='Password' type="password" onChange={(event) => {
                    setUserInfo((prev) => {
                        return { ...prev, Password: event.target.value }
                    })
                }} value={userInfo.Password} name='Password' className="input-box pl-8 text-left font-sans font-normal md:w-1/2 w-full text-[#543F9D] my-2 focus:placeholder-transparent placeholder-[#543F9D] py-2 text-2xl bg-transparent outline-none rounded-3xl  border-2 border-[#543F9D]"></input>
                <input placeholder='Confirm Password' type="password" onChange={(event) => {
                    setUserInfo((prev) => {
                        return { ...prev, "confirmPassword": event.target.value }
                    })
                }} value={userInfo.confirmPassword} name='Confirm Password' className="input-box pl-8 text-left font-sans font-normal md:w-1/2 w-full text-[#543F9D] my-2 focus:placeholder-transparent placeholder-[#543F9D] py-2 text-2xl bg-transparent outline-none rounded-3xl  border-2 border-[#543F9D]"></input>
                <input type="file" onChange={(event) => {
                    setImage(event.target.files[0])
                }} className="input-box pl-8 text-left font-sans font-normal md:w-1/2 text-[#543F9D] w-full my-2 focus:placeholder-transparent placeholder-[#543F9D] py-2  bg-transparent outline-none rounded-3xl  border-2 border-[#543F9D]" />
                {error && <div className='text-red-500'>{error}</div>}
                <div className='flex flex-col items-center'>
                    <div className='hover:cursor-pointer text-theme-colour text-lg mb-2' onClick={() => navigate('/login')}>Already have an account?</div>
                    {/* <div  className='bg-[#543F9D] hover:cursor-pointer px-4 w-28 text-center py-2 rounded-lg text-xl text-white' onClick={handleSubmit}>Register</div> */}
                    <input type="submit" value="Register" className='bg-[#543F9D] hover:cursor-pointer px-4 w-28 text-center py-2 rounded-lg text-xl text-white' />
                </div>
            </form>
        </div>
    )
}

export default Register