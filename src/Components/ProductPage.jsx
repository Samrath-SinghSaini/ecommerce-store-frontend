/* eslint-disable react/prop-types */
import { keyframes } from '@emotion/react';
import Star from '@mui/icons-material/GradeRounded';
import { style } from '@mui/system';
import {useEffect, useRef, useState} from 'react'
import ProductCard from './ProductCard';
import ArrowForward from "@mui/icons-material/ArrowForwardIos";
import souled from '../images/souled.jpg'
import ArrowBack from "@mui/icons-material/ArrowBackIos";
function ProductPage(prop){
    let ratingArr = [...Array(5).fill(false)]
    let card = [1,2,3,4,5,6]
    let rating = useRef(ratingArr)
    let starFillStyle = {
        color:'Yellow'
    }
    let starBlankStyle = {
        color:'white'
    }  
    let loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
  
    
    function handleClick(index){
        let tempArr = ratingArr
            for(let i =0; i < 5; i++){
                if(i <= index){
                    tempArr[i] = true
                } else{
                    tempArr[i] = false
                }
            }
            rating.current = tempArr      
        
    }
    useEffect(()=>{
        console.log(rating.current)
    }, [rating.current])
    
    

    return <div className="product-page">
    <div className="item-parent-container">
    <div className="item-img-div">
        <img className="item-img" src="http://localhost:3000/images/phones/65039af2dbfc73f56796eacd.jpg"></img>
    </div>
    <div className="item-info">
        <h1>QuietComFort 45 Bluetooth Wireless Noise Cancelling Headphones with Microphone for Phone Calls — White Smoke</h1>
        <p>Category name</p>
        <p>Brand name</p>
        <h3>$XXX</h3>
        <div className="review-div">
            {[...Array(5)].map((element, index)=>{  
                return <>
                    <Star key={index} value={index} 
                    onClick={()=>{handleClick(index)}} style={rating[index] ? starFillStyle: starBlankStyle} 
                    className='rating-icon'/>
                </>
            })}
        </div>
        <button>Add to Cart 🛒</button>
        <button>Add to Wishlist 💟</button>
        <div className='description-div'>
        <h4>Product Description</h4>
        {loremIpsum}
        </div>
    
        
    </div>
    
    </div>
    <div className='user-review-div'>
        <h2>User Reviews</h2>
        <UserReview heading='Great Product' review={loremIpsum} userName='IndoriPatiala'/>
    </div>
    <div className='similar-product-div'>
        <h2>Similar Products</h2>
        <div className="card-container">
          <button className="arrow-btn back-btn">
            <ArrowBack />
          </button>
          {card.map((value) => {
            return <ProductCard key={value} src={souled}/>;
          })}
          <button className="arrow-btn forward-btn">
            <ArrowForward />
          </button>
        </div>
    </div>
    </div>
}
function UserReview(props){
    return <>
        <h3>{props.heading}</h3>
        <p>By User: {props.userName}</p>
        <div className='user-rating-div'></div>
        <p>{props.review}</p>
    </>
}
export default ProductPage