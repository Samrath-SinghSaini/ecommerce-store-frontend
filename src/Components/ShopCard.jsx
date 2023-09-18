/* eslint-disable react/prop-types */
function ShopCard(props){
    let imgSrc = 'http://localhost:3000/images/'+ props.category +'/'+props.image + '.jpg'
   
    return <div className="card-div">
        <img src={imgSrc} className="shop-card-img"/>
        <div className="product-detail">
            <div className="detail-div"><p>{props.name}</p>
            <p>${props.price}</p></div>
            
            <button className="cart-btn">Add to cart</button>

        </div>
    </div>
}
export default ShopCard