/* eslint-disable react/prop-types */
import FavoriteIconEmpty from '@mui/icons-material/FavoriteBorder';
import FavoriteIconFilled from '@mui/icons-material/Favorite';
import {useState} from 'react'
import Wishlist from './Wishlist';
function ShopCard(props){
    const [inWishList, setInWishlist] = useState(false)
    let imgSrc = 'http://localhost:3000/images/'+ props.category +'/'+props.image + '.jpg'
    let wishListEmpty = {color:'red', fontSize:'30px'}
    let wishListAdded = {
        color:'red', fontSize:'30px'
    }

    function addToWishList(){
        if(!inWishList){
            setInWishlist(true)
        } else {
            setInWishlist(false)
        }
    }
    return <div className="card-div">
        <img src={imgSrc} className="shop-card-img"/>
        <div className="product-detail">
            <div className="detail-div"><p>{props.name}</p>
            <p>${props.price}</p></div>
            <button onClick={addToWishList} className='wishlist-btn'>{
                 inWishList ? <FavoriteIconFilled/> :  <FavoriteIconEmpty/> 
            }</button>
            <button className="cart-btn">Add to cart</button>
        </div>
    </div>
}
export default ShopCard