import {Link} from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
function Register(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [submitMessage, setSubmitMessage] = useState('')
    function connectServer(event){
        console.log("I ran, I ran so far away")
        event.preventDefault()
        let registerData = {
            email:email, 
            username:username, 
            password:password
        }
        axios.post('/api/user', JSON.stringify(registerData), {
            headers:{
                "Content-Type":'application/x-www-form-urlencoded'
            }
        })
        .then((res)=>{
            console.log(res)
            setSubmitMessage('Your account has been created')
        })
        .catch((err)=>{console.log(err)
            setSubmitMessage('There has been an error')
        })

    }
    
    function changeFormData(event){
        let input = event.target.name
        if(input == 'email'){
            setEmail(event.target.value)
        } else if(input == 'password'){
            setPassword(event.target.value)
        } else if(input == 'username'){
            setUsername(event.target.value)
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