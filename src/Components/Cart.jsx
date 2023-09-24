import { useState, useRef, useEffect } from "react";


// function updateTotalPrice(newPrice) {
//   priceTotal.current += newPrice
// }

function ProductSection(innerProp, { updateTotalPrice }) {
  const [quantity, setQuantity] = useState(Number(innerProp.quantity));
  const [price, setPrice] = useState(
    Number(innerProp.price) * Number(innerProp.quantity)
  );
    

  function changeQuantity(event) {
    let val = event.target.value;
    if (val == "increment") {
      let newQuant = Number(quantity) + 1;
      setQuantity(newQuant);
      let itemTotal = Number(innerProp.price) * newQuant;
      setPrice(itemTotal);
      innerProp.getSumAdd(1)
      
      
    } else if (val == "decrement") {
      let newQuant = Number(quantity) - 1;
      setQuantity(newQuant);
      let itemTotal = Number(innerProp.price) * newQuant;
      setPrice(itemTotal);
      innerProp.getSumSubtract(1)
      
     
      
    }
  }
  function quantityChange(e) {
    let oldQuantity = quantity; 
    let newQuantity = e.target.value
    setQuantity(newQuantity);
    let itemTotal = Number(innerProp.price) * Number(newQuantity);
    let oldPrice = price
    setPrice(itemTotal);   
    if(newQuantity > oldQuantity){
      let change = newQuantity - oldQuantity
      innerProp.getSumAdd(change)
    } else if(newQuantity < oldQuantity){
      let change = oldQuantity - newQuantity
      innerProp.getSumSubtract(change)
    } 
    
  }
  
  
  return (
    <div className="cart-product">
      <div>
        <img className="cart-product-image" src={innerProp.src}></img>
      </div>

      <div className="cart-product-info">
        <div className="cart-product-info-div">
          <div className="cart-product-name">
          <h2>{innerProp.productName}</h2>
          <p>{innerProp.brandName}</p>
          </div>
          
          <p className="cart-product-price">${innerProp.price}</p>
        </div>

        <p>
          <button
            value="decrement"
            className="counter-btn"
            onClick={(event) => {
              changeQuantity(event);
            }}
          >
            -
          </button>
          <input
            className="counter-input"
            type="text"
            value={quantity}
            onChange={(e) => {
              quantityChange(e);
            }}
          ></input>
          <button
            value="increment"
            className="counter-btn"
            onClick={(event) => {
              changeQuantity(event);
            }}
          >
            +
          </button>
        </p>
        <button className="cart-btn">Remove</button>
        <button className="cart-btn">Move to Wishlist</button>
        <p className="item-total">Item Total: {price}</p>
      </div>
    </div>
  );
}

function Cart(props) {
  //src product Name price brandName quantity

  
let itemArr = [...Array(3).fill({src:"http://localhost:3000/images/phones/65039af2dbfc73f56796eacd.jpg",
productName:"Sample Product 1Sample Sample Product 1Sample Product 1Sample Product 1Sample Product 1Sample Product 1Sample Sample Product 1Sample Product 1Sample Product 1Sample Product 1Sample Product 1Sample ",
brandName:"Apple",
price:"3000",
quantity:"1"})]
let initProductPriceSum = 0
itemArr.map((element,index)=>{
  initProductPriceSum +=Number(element.price)
})
const [allProductSum, setAllProductSum] = useState(initProductPriceSum)
let newFinalSum = initProductPriceSum;

function getSumAdd(quantity){
  let newSum = Number(allProductSum) + Number(quantity)*(Number(itemArr[0].price))
  console.log(newSum)
  console.log(typeof(newSum))
  setAllProductSum(newSum)
}
function getSumSubtract(quantity){
  let newSum = Number(allProductSum) - Number(quantity)*(Number(itemArr[0].price))
  console.log(newSum)
  console.log(typeof(newSum))
  setAllProductSum(newSum)
}


  return (
    <div className="cart-div">
      <h1>Your Cart</h1>
      <div className="cart-main">
        <div className="cart-product-section">
          <ProductSection
            src="http://localhost:3000/images/phones/65039af2dbfc73f56796eacd.jpg"
            productName="Sample Product 1Sample Product 1Sample Product 1Sample Product 1Sample Product 1Sample "
            brandName="Apple"
            price="3000"
            quantity="1"
            getSumAdd={getSumAdd}
            getSumSubtract={getSumSubtract}
          />
          <ProductSection
            src="http://localhost:3000/images/phones/65039af2dbfc73f56796eacd.jpg"
            productName="Sample Product 1"
            brandName="Apple"
            price="3000"
            quantity="1"
            getSumAdd={getSumAdd}
            getSumSubtract={getSumSubtract}
            
          />
          <ProductSection
            src="http://localhost:3000/images/phones/65039af2dbfc73f56796eacd.jpg"
            productName="Sample Product 1"
            brandName="Apple"
            price="3000"
            quantity="1"
            getSumAdd={getSumAdd}
            getSumSubtract={getSumSubtract}
          />
        </div>
        <div className="cart-detail-section">
          <h2>Order Summary</h2>
          {itemArr.map((element, index) => {
            return (
              <>
                <div className="summary-container">
                  <span>{element.productName}</span>
                  <span>${element.price}</span>
                </div>
              </>
            );
          })}
          <div className='summary-container'>
            <span>Product Totals:</span>
            <span>${allProductSum}</span>
            
          </div>
          
        </div>
      </div>
    </div>
  );
}
export default Cart;
