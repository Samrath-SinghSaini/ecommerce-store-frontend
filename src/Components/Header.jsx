/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import StoreIcon from '/src/images/storeIcon.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Header(props){
    let isLoggedIn = props.isLoggedIn
    let buttonDisplayStyle = {display:'none'}
    let navigate = useNavigate()
    async function logoutFunc(){
        axios.get('/api/user/logout')
        .then((res)=>{
            console.log('header - loogut func called')
        })
        props.changeLogInState(false)
        navigate('/')
    }
    
    return <div className="header-container">
    <span className='store-icon'><img src={StoreIcon} className='store-icon-img'></img></span>

    <div className='nav-btn-container'>
        <Link to='/'>
        <button className="nav-btn" >Home</button>
        </Link>
        <Link to='/login'>
        <button className="nav-btn" style={{display: !isLoggedIn ? 'inline-block' :'none'}}>Login </button>
        </Link>
        <Link to='/register'>
        <button className="nav-btn" style={{display: !isLoggedIn ? 'inline-block' :'none'}}>Register</button>
        </Link>
        <Link to='/products'>
        <button className="nav-btn" style={{display: isLoggedIn ? 'inline-block' :'none'}} >Products</button>
        </Link>
        <Link to='/wishlist'>
        <button className="nav-btn" style={{display: isLoggedIn ? 'inline-block' :'none'}} >Wishlist 💟</button>
        </Link>
        <Link to='/cart'>
        <button className="nav-btn" style={{display: isLoggedIn ? 'inline-block' :'none'}} >Cart 🛒</button>
        </Link>
        <Link to='/'>
        <button className="nav-btn" style={{display: isLoggedIn ? 'inline-block' :'none'}} onClick={logoutFunc}>Logout</button>
        </Link>
        <Link to='/'>
        <button className="nav-btn" style={{display: isLoggedIn ? 'inline-block' :'none'}}>Account</button>
        </Link>
        </div>
    </div>
}

export default Header