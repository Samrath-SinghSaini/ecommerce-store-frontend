/* eslint-disable react/prop-types */
import {Link, Form, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {redirect} from 'react-router-dom'
import {setDefaultHeader} from '../axiosConfig'
function Login(props){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [submitMessage, setSubmitMessage] = useState('')
    const [accessToken, setAccessToken] = useState(null)
    
    let navigate = useNavigate()
    function handleForm(event){
        
        console.log("I ran, I ran so far away")
        event.preventDefault()
        if(password.length == 0 || username.length == 0){
            setSubmitMessage('Password or Username is empty')
        }
        else if(password.length <8){
            setSubmitMessage('Password length is too short. Please choose a longer password.')
        } 
        
        else{
        let loginData = {
            username:username, 
            password:password
        }
        axios.post('/api/user/login', (loginData), {
            headers:{
                "Content-Type":'application/x-www-form-urlencoded', 
            }
        })
        .then((res)=>{
            console.log(res)
            console.log(document.cookie)
            if(res.data.authenticated === true && res.status === 200){
                setSubmitMessage('You have been authenticated successfully')
                console.log('res token val')
                console.log(res.data.token)
                props.setAuthToken(res.data.token)
                props.changeLogInState(true)
                // setTimeout(()=>{navigate('/products')}, 2000)
                      
            } else{
                setSubmitMessage('try again later')
            }
        })
        .catch((err)=>{console.log(err)
            setSubmitMessage(err.response.data.message)
            
        })
    }

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
        <p className='login-submit-message'>{submitMessage}</p>
        </div>
        </form>
        </div>
        </div>
    </>
}
export default Login