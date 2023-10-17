/* eslint-disable react/prop-types */
function ProductCard(props){
    return <div className="card">
        <img className="card-img" src={props.src}></img>
        <div className="card-details-div">
        <p>{props.name}</p>
        <p>${props.price}</p>
        <p>⭐⭐⭐⭐</p>
        </div>
    </div>
}
export default ProductCard