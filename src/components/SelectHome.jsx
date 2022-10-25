import { useEffect, useState } from 'react'
import { Home, StartUpPage } from './index'

function SelectHome() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        if (sessionStorage.getItem('userid')) {
            setIsLoggedIn(true)
        }
    }, [])
    return (
        <div>
            {sessionStorage.getItem('userid') ? <Home /> : <StartUpPage />}
        </div>
    )
}

export default SelectHome