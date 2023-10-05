import React, {useState, useEffect} from 'react'
import {useNavigate } from 'react-router-dom'

function Access(prop){
    let navigate = useNavigate()
    const [countdown, setCountdown] = useState(10)
    let count = countdown
    useEffect(()=>{
        let interval = setInterval(()=>{
            setCountdown((count)=>{
                if(count > 0){
                    return count -1
                }
            })
        }, 1000)
        if(countdown === 0){
            navigate('/login')
        }
        console.log('navigate login')
        return ()=> clearInterval(interval)
    }, [countdown])
    return <div className="access-div">
        <h1 className='access-h1'>Error: You cannot access this page</h1>
        <h2>You will be redirected to the login page in {countdown}</h2>
        <h2>Click <a href='/login'>here</a> if you are not redirected automatically</h2>
    </div>
}

export default Access