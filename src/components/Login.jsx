import { useState, useEffect } from 'react'
import logo from '../images/calendarlogo.png'
import loginImage from '../images/login_image.jpg'
import InputCustom from './InputBox'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

function Login() {
    const [userInfo, setUserInfo] = useState({})
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!userInfo.Username || !userInfo.Password) {
            setError('Please fill all the fields')
        }
        else {
            setError('')
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, userInfo)
            console.log(res.data)
            if (res.data.message === 'successful') {
                console.log("successful")
                await sessionStorage.setItem('userid', res.data.token)
                navigate('/')
            }
            else {
                console.log("here")
                setError('Invalid Credentials')
            }
        }
    }

    const handleCallback = async (response) => {
        var userObject = jwt_decode(response.credential);
        console.log(userObject)
        const { name, email } = userObject
        const userInfoLogin = {
            Username: email,
            Email: email,
            Name: name,
            Password: userObject.sub,
        }
        console.log(userInfoLogin)
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/googlelogin`, userInfoLogin)
        console.log(res.data)
        if (res.data.message === 'successful') {
            console.log("successful")
            await sessionStorage.setItem('userid', res.data.token)
            navigate('/')
        }
        else {
            console.log("here")
            setError('Invalid Credentials')
        }
    }
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "32751806434-p5scihlea8tqa886erno02nim63nafmt.apps.googleusercontent.com",
            callback: handleCallback
        })
        google.accounts.id.renderButton(
            document.getElementById('google-signin'),
            { theme: 'outline', size: 'large' }
        )

    }, [])

    return (
        <div className='flex md:flex-row flex-col h-[100vh] items-center w-full justify-between'>
            <form className='flex flex-col items-center w-3/5 mb-20' onSubmit={handleSubmit}>
                <img src={logo} className="w-20 h-20" alt="" />
                <div className='font font-sans text-4xl font-bold text-[#543F9D] mt-8'>LOGIN</div>
                <InputCustom placeholder="Username" field={userInfo} setField={setUserInfo} name="Username"></InputCustom>
                <input placeholder='Password' type="password" onChange={(event) => {
                    setUserInfo((prev) => {
                        return { ...prev, Password: event.target.value }
                    })
                }} value={userInfo.Password} name='Password' className="input-box pl-8 text-left font-sans font-normal w-1/2 text-[#543F9D] my-2 focus:placeholder-transparent placeholder-[#543F9D] py-2 text-2xl bg-transparent outline-none rounded-3xl  border-2 border-[#543F9D]"></input>
                {error && <div className='text-red-500'>{error}</div>}
                <div className='flex flex-col items-center'>
                    <div className='hover:cursor-pointer text-xl mb-8 text-[#543F9D]' onClick={() => navigate('/register')}>Don't have an account?</div>
                    <input type="submit" value="Login" className='bg-[#543F9D] hover:cursor-pointer px-4 w-28 text-center py-2 rounded-lg text-xl text-white' />
                    <div className='my-5' id='google-signin'></div>
                </div>
            </form>
            <div className='w-3/5'>
                <img src={loginImage} alt="" />
            </div>
        </div>
    )
}

export default Login