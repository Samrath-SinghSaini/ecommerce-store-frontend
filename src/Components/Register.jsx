import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
function Register(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [fullname, setfullname] = useState('')
    const [submitMessage, setSubmitMessage] = useState('')
    let navigate = useNavigate()
    function connectServer(event){
        console.log("I ran, I ran so far away")
        event.preventDefault()
        if(email === '' || password === '' || username === ''|| fullname=== ''){
            setSubmitMessage('One or more fields are empty. Please enter all information.')
        } else{
        let registerData = {
            email:email, 
            username:username, 
            fullname: fullname, 
            password:password
        }
        axios.post('/api/user/register', registerData, {
            headers:{
                "Content-Type":'application/x-www-form-urlencoded'
            }
        })
        .then((res)=>{
            console.log(res.data)
            if(res.data.registered){
            setSubmitMessage('Your account has been created')
            setTimeout(()=>{navigate('/login')}, 2000)
            } else{
                setSubmitMessage('Something went wrong try again later')
            }
        })
        .catch((err)=>{console.log(err)
            console.log(err)
            setSubmitMessage('There has been an error')
            console.log(err.response.data.registered)
        })
    }

    }
    
    function changeFormData(event){
        let input = event.target.name
        if(input == 'email'){
            setEmail(event.target.value)
        } else if(input == 'password'){
            setPassword(event.target.value)
        } else if(input == 'username'){
            setUsername(event.target.value)
        } else if(input == 'fullname'){
            setfullname(event.target.value)
        }
    }

    return <>
        <div className="register-page">
        <div className='register-container'>
        
        <form className="register-form" action='/' method='post' onSubmit={(event)=>{connectServer(event)}}>
        <h1 className="register-heading">Register</h1>
        <div className='register-section'>
        <label className="register-lbl">Email: </label>        
        <input className="register-input" type="email" name='email' value={email} onChange={(event)=>{changeFormData(event)}}></input>
        </div>
        <div className='register-section'>
        <label className="register-lbl">Username: </label>
        <input className="register-input" type="text" name='username' value={username} onChange={(event)=>{changeFormData(event)}}></input>
        </div>
        <div className='register-section'>
        <label className="register-lbl">Fullname: </label>
        <input className="register-input" type="text" name='fullname' value={fullname} onChange={(event)=>{changeFormData(event)}}></input>
        </div>
        <div className='register-section'>
        <label className="register-lbl">Password: </label>
        <input className="register-input" type="password" name='password' value={password}onChange={(event)=>{changeFormData(event)}}></input>
        </div>
        <div className='register-btn-container'>
        <button className="register-btn" type="submit" onClick={(e)=>{connectServer(e)}}>Submit</button>  
        <Link to='/' className='forgot-pass'>Forgot Password?</Link>
        <p>{submitMessage}</p>
        </div>
        </form>
        </div>
        </div>
    </>
}
export default Register