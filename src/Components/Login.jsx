import {Link, Form, useSubmit} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'

function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [submitMessage, setSubmitMessage] = useState('')
    
    function handleForm(event){
        console.log("I ran, I ran so far away")
        event.preventDefault()
        let loginData = {
            username:username, 
            password:password
        }
        axios.post('/api/user/login', (loginData), {
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

    function setValue(event){
        let target = event.target.name
        if(target == 'username'){
            setUsername(event.target.value)
        } else if(target == 'password'){
            setPassword(event.target.value)
        }
    }
    return <>
        <div className='login-page'>
        <div className="login-container">
        <form className="login-form" action='/' method='post' onSubmit={(e)=>handleForm(e)}>
        <h1 className="login-heading">Login</h1>
        <div className='login-section'>
        <label className="login-lbl">Username: </label>
        <input className="login-input" type="text" name='username' value={username} onChange={(event)=>{setValue(event)}}></input>
        </div>
        <div className='login-section'>
        <label className="login-lbl">Password: </label>
        <input className="login-input" type="password" name='password' value={password} onChange={(event)=>{setValue(event)}}></input>
        </div>
        <div className='login-btn-container'>
        <button className="login-btn" type="submit">Submit</button>
        <Link to='/' className='forgot-pass'>Forgot Password?</Link>
        <p>{submitMessage}</p>
        </div>
        </form>
        </div>
        </div>
    </>
}
export default Login