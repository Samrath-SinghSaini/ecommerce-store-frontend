/* eslint-disable react/prop-types */
import FavoriteIconEmpty from '@mui/icons-material/FavoriteBorder';
import FavoriteIconFilled from '@mui/icons-material/Favorite';
import {useState} from 'react'
import Wishlist from './Wishlist';
import {Link} from 'react-router-dom'
function ShopCard(props){
    //category/image/name price
    const [inWishList, setInWishlist] = useState(false)
    let baseUrl = 'http://localhost:3000/images/'
    let imgSrc = baseUrl + props.category +'/'+props.image + '.jpg'
    let wishListEmpty = {color:'red'}
    let wishListAdded = {
        color:'red'
    }
    let objectId = props.id 
    // console.log('object id for product ' + props.name + ' is : ' + objectId)

    function addToWishList(){
        if(!inWishList){
            setInWishlist(true)
        } else {
            setInWishlist(false)
        }
    }
    return <div className="card-div">
        <Link to={'/products/item/' + objectId}><img src={imgSrc} className="shop-card-img"/></Link>
        <div className="product-detail">
            <div className="detail-div"><p><Link to={'/products/item/'+ objectId}>{props.name}</Link></p>
            <p>${props.price}</p></div>
            <div className='product-btn-div'>
            <button onClick={addToWishList} className='wishlist-btn'>{
                 inWishList ? <FavoriteIconFilled style={{fontSize:'36px'}}/> :  <FavoriteIconEmpty style={{fontSize:'36px'}}/> 
            }</button>
            <button className="cart-btn">Add to cart</button>
            </div>
        </div>
    </div>
}
export default ShopCard