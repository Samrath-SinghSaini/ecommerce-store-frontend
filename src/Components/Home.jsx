import { Route, Routes, useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ArrowForward from "@mui/icons-material/ArrowForwardIos";
import ArrowBack from "@mui/icons-material/ArrowBackIos";
import CategoryCard from "./CategoryCard";
import DiscountCard from "./DiscountCard";
import ArrowBtn from "./ArrowBtn";
import Footer from "./Footer";

import ShopCard from "./ShopCard";
import React from "react";
import axios from 'axios'
function Home() {
  let card = [1, 2, 3, 4, 5, 6];

  let splashURL = 'https://ecommerce-store-backend-vop3.onrender.com/images/SplashImages/bannerImage0.jpg'

  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null)
  const [bestSellerArr, setBestSellerArr] = useState([])
  const [discountArr, setDiscountArr] = useState([])
  const [categoryArr, setCategoryArr] = useState([])
  let refArr = [scrollRef1, scrollRef2]
  const navigate = useNavigate()
  // function moveElement(event) {
  //   let btnName = event.currentTarget.name;

  //   console.log(btnName);
  //   let maxScrollWidth =
  //   scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
  //   console.log("max scroll:" + maxScrollWidth);

  //   if (btnName == "scroll-forward") {
  //     scrollRef.current.scrollLeft += 350;
  //     console.log(scrollRef.current.scrollLeft);
  //     if (scrollRef.current.scrollLeft >= maxScrollWidth - 50) {
  //       scrollRef.current.scrollLeft = 0;
  //     }
  //   }
  //   if (btnName == "scroll-back") {
  //     scrollRef.current.scrollLeft -= 350;
  //     if (scrollRef.current.scrollLeft == 0) {
  //       scrollRef.current.scrollLeft = maxScrollWidth;
  //     }
  //   }
  // }
  function moveElement(event, refName) {
    let btnName = event.currentTarget.name;

    // console.log(btnName);
    // console.log(refName.current)
    let maxScrollWidth =
    refName.current.scrollWidth - refName.current.clientWidth;
    // console.log("max scroll:" + maxScrollWidth);

    if (btnName == "scroll-forward") {
      refName.current.scrollLeft += 350;
      // console.log(refName.current.scrollLeft);

      if(maxScrollWidth - refName.current.scrollLeft < 350 && maxScrollWidth - refName.current.scrollLeft > 0){
        refName.current.scrollLeft += maxScrollWidth - refName.current.scrollLeft
      }else if (refName.current.scrollLeft >= maxScrollWidth) {
        refName.current.scrollLeft = 0;
      }
    } 
    if (btnName == "scroll-back") {
      refName.current.scrollLeft -= 350;
      if (refName.current.scrollLeft == 0) {
        refName.current.scrollLeft = maxScrollWidth;
      }
    }
  }
  async function getBestSellers() {
    try {
      // console.log("from products");

      let res = await axios.get("/api/home/best", {
        withCredentials: true,
      });
      // console.log(res.data)
      setBestSellerArr(res.data)
      return res.data;
    } catch (err) {
      // console.log(err);
      return [-1];
    }
  }
  async function getDiscounts() {
    try {
      // console.log("from home discounts");

      let res = await axios.get("/api/home/discount", {
        withCredentials: true,
      });
      // console.log('from get discounts')
      // console.log(res.data)
      setDiscountArr(res.data)
      return res.data;
    } catch (err) {
      console.log(err);
      return [-1];
    }
  }

  async function getCategories() {
    try {
      let res = await axios.get("/api/category/fetch");
      return res.data;
    } catch (err) {
      // console.log(err);
      return [-1];
    }
  }
  useEffect(()=>{
    getBestSellers()
    .then((res)=>{
      // console.log(res)
    })
    .catch((err)=>{
      console.log(err)
      setBestSellerArr([new Array(10).fill({category:"laptop",
        name:"Apple Macbook Pro",
        price:"3000",
        image:"650398d9dbfc73f56796eacb"})])
    })
    getDiscounts()
    .then((res)=>{
      // console.log(res)
    })
    .catch((err)=>{
      console.log(err)
      setDiscountArr([new Array(10).fill({category:"laptop",
        name:"Apple Macbook Pro",
        price:"3000",
        image:"650398d9dbfc73f56796eacb"})])
    })

    getCategories()
      .then((res) => {
        let tempCat = [];
        res.map((element) => {
          tempCat.push(element.name);
        });
        // console.log(tempCat)
        setCategoryArr(tempCat);
      })
      .catch((err) => {
        setCategoryArr([-1]);
      });
  }, [])

  function categoryOnClick(name){
    navigate('/products', {state:{categoryName:name}})
  }


  return (
    <div className="home-page">
      <div className="banner-container">
        <button className="arrow-btn back-btn" name="scroll-back">
          <ArrowBack />
        </button>
        <img src={splashURL} className="bannerImg"></img>
        <button className="arrow-btn forward-btn" name="scroll-forward">
          <ArrowForward />
        </button>
      </div>
      <div className="home-product-container">
        <h1>Top Selling Products For you</h1>

        <div className="card-container" ref={refArr[0]}>
          <button
            
            className="arrow-btn back-btn"
            name="scroll-back"
            onClick={(event) => {
              moveElement(event, refArr[0]);
            }}
          >
            <ArrowBack />
          </button>
          {bestSellerArr.map((element, index) => {
            return (
              <ShopCard
                key={index}
                category={element.category}
                name={element.name}
                price={element.price.$numberDecimal}
                image={element.image}
                id={element._id}
              />
            );
          })}
          <button
            className="arrow-btn forward-btn"
            name="scroll-forward"
            onClick={(event) => {
              moveElement(event, refArr[0]);
            }}
            id="arrow-forward-btn"
          >
            <ArrowForward
              name="scroll-forward"
            />
          </button>
        </div>
      </div>
      <div className="home-categories-container">
        <h1 className="categories-heading">Browse By Categories</h1>
        <div className="categories-card-container">
          {categoryArr.map((element, value) => {
            return (
              <CategoryCard src={element} key={value} name={element} clickFunc={categoryOnClick} />
            );
          })}
        </div>
      </div>
      <h1>Fresh Discounts for you</h1>
      <div className="home-product-container" >
        
        <button
          className="arrow-btn back-btn"
          name="scroll-back"
          onClick={(event) => {
              moveElement(event, refArr[1]);
            }}
        >
          <ArrowBack />
        </button>
        <div className="card-container" ref={refArr[1]}>
          {discountArr.map((element, index) => {
            //category/image/name price
            return (
              <ShopCard
                key={index}
                category={element.category}
                name={element.name}
                price={element.price.$numberDecimal}
                image={element.image}
                id={element._id}
              />
            );
          })}
          <button
            className="arrow-btn forward-btn"
            name="scroll-forward"
            onClick={(event) => {
              moveElement(event, refArr[1]);
            }}
          >
            <ArrowForward />
          </button>
        </div>
      </div>
      <div className="footer-container"></div>
    </div>
  );
}
export default Home;
