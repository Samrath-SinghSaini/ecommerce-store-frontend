import StoreIcon from '/src/images/storeIcon.png'
import { Link } from 'react-router-dom';
function Header(){
    return <div className="header-container">
    <span className='store-icon'><img src={StoreIcon} className='store-icon-img'></img></span>

    <div className='nav-btn-container'>
        <Link to='/'>
        <button className="nav-btn">Home</button>
        </Link>
        <Link to='/login'>
        <button className="nav-btn">Login</button>
        </Link>
        <Link to='/register'>
        <button className="nav-btn">Register</button>
        </Link>
        <Link to='/products'>
        <button className="nav-btn">Products</button>
        </Link>
        </div>
    </div>
}

export default Header