import { useState, useRef, useEffect } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
// function updateTotalPrice(newPrice) {
//   priceTotal.current += newPrice
// }

function ProductSection(innerProp, { updateTotalPrice }) {
  const [quantity, setQuantity] = useState(Number(innerProp.quantity));
  const [price, setPrice] = useState(
    Number(innerProp.price) * Number(innerProp.quantity)
  );
  let imgUrl = 'https://ecommerce-store-backend-vop3.onrender.com/images/' + innerProp.category + '/' + innerProp.src+ '.jpg'
  function changeQuantity(event) {
    let val = event.target.value;
    if (val == "increment") {
      let newQuant = Number(quantity) + 1;
      setQuantity(newQuant);
      let itemTotal = Number(innerProp.price) * newQuant;
      setPrice(itemTotal);
      innerProp.getSumAdd(1, innerProp.index);
    } else if (val == "decrement") {
      let newQuant = Number(quantity) - 1;
      setQuantity(newQuant);
      let itemTotal = Number(innerProp.price) * newQuant;
      setPrice(itemTotal);
      innerProp.getSumSubtract(1, innerProp.index);
    }
  }
  function quantityChange(e) {
    let oldQuantity = quantity;
    let newQuantity = e.target.value;
    setQuantity(newQuantity);
    let itemTotal = Number(innerProp.price) * Number(newQuantity);
    let oldPrice = price;
    setPrice(itemTotal);
    if (newQuantity > oldQuantity) {
      let change = newQuantity - oldQuantity;
      innerProp.getSumAdd(change);
    } else if (newQuantity < oldQuantity) {
      let change = oldQuantity - newQuantity;
      innerProp.getSumSubtract(change);
    }
  }
  useEffect(()=>{
    innerProp.updateSummaryTotal(price,innerProp.index)
  }, [price])

  return (
    <div className="cart-product">
      <div>
        <img className="cart-product-image" src={imgUrl}></img>
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
  let userName = props.userName
  const navigate = useNavigate()
  const [cartItemsArr, setCartItemsArr] = useState([])
  const [emptyCart, setEmptyCart] = useState(true)
  const [productTotalArr, setProductTotalArr] = useState([])
  let itemArr = [
    ...Array(3).fill({
      src: "http://localhost:3000/images/phones/65039af2dbfc73f56796eacd.jpg",
      productName:
        "Sample Product 1Sample Sample Product 1Sample Product 1Sample Product 1Sample Product 1Sample Product 1Sample Sample Product 1Sample Product 1Sample Product 1Sample Product 1Sample Product 1Sample ",
      brandName: "Apple",
      price: "3000",
      quantity: "1",
    }),
  ];
  let initProductPriceSum = 0;
  // cartItemsArr.map((element, index) => {
  //   initProductPriceSum += Number(element.price.$numberDecimal);
  // });
  const [allProductSum, setAllProductSum] = useState(initProductPriceSum);
  let newFinalSum = initProductPriceSum;

  useEffect(()=>{
    getCartItems()
    .then((res)=>{console.log('cart res successfully ran')})
    .catch((err)=>{console.log(err)})
    
    if(cartItemsArr.length !== 0){
      emptyCart(false)
    }
  },[])

  useEffect(()=>{
    let tempArr = new Array(cartItemsArr.length).fill(0)
    let totalPrice = 0
    cartItemsArr.map((element, index) => {
      initProductPriceSum += Number(element.price.$numberDecimal);
      tempArr[index] = element.price.$numberDecimal
      totalPrice += Number(element.price.$numberDecimal)
    });
    setProductTotalArr(tempArr)
    
    setAllProductSum(totalPrice)

    
  }, [cartItemsArr])
  async function getCartItems(){
    try{
      let res = await axios.get('/api/user/cart', {
        params:{userName:userName},
        withCredentials:true
      })
      console.log('from cart get items- ')
      // console.log(res)
      setCartItemsArr(res.data.cartArr)
      return res.data.cartArr
      
    }
    catch(err){
      console.log(err)
      return null
    }
  }

  function getSumAdd(quantity, index) {
    let newSum =
      Number(allProductSum) + Number(quantity) * Number(cartItemsArr[index].price.$numberDecimal);
    // console.log(newSum);
    // console.log(typeof newSum);
    setAllProductSum(newSum);
  }
  function getSumSubtract(quantity, index) {
    let newSum =
      Number(allProductSum) - Number(quantity) * Number(cartItemsArr[index].price.$numberDecimal);
    // console.log(newSum);
    // console.log(typeof newSum);
    setAllProductSum(newSum);
  }
  function updateSummaryTotal(newPrice,index){
    
    let tempArr = [...productTotalArr]
    tempArr[index] = newPrice
    // console.log('from update summary total')
    // console.log(tempArr)
    setProductTotalArr(tempArr)
  } 

  return (
    <div className="cart-div">
      <h1>Your Cart</h1>
      <div className="empty-cart" style={{display: emptyCart?'none' : 'block'}}>
        <h3>Your cart is empty.</h3>
        <p>Browse our products section to shop items!</p>
        <button onClick={()=>{navigate('/products')}}>Products</button>
      </div>
      <div className="cart-main">
        <div className="cart-product-section">
        {cartItemsArr.map((element,index)=>{
          return <ProductSection src={element.image} productName={element.name}
            brandName={element.brand} price={element.price.$numberDecimal} quantity='1'
            getSumAdd={getSumAdd}
            getSumSubtract={getSumSubtract}
            updateSummaryTotal={updateSummaryTotal}
            category={element.category}
            key={index}
            index={index}

          />
        })}
          
        </div>
        <div className="cart-detail-section">
          <h2>Order Summary</h2>
          {cartItemsArr.map((element, index) => {
            return (
              <>
                <div className="summary-container">
                  <span>{element.name}</span>
                  <span>${productTotalArr[index]}</span>
                </div>
              </>
            );
          })}
          <div className="summary-container">
            <span>Product Totals:</span>
            <span>${allProductSum}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
