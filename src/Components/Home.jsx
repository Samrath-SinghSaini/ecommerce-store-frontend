import { Route, Routes } from "react-router-dom";
import { useRef } from "react";
import ProductCard from "./ProductCard";
import ArrowForward from "@mui/icons-material/ArrowForwardIos";
import ArrowBack from "@mui/icons-material/ArrowBackIos";
import CategoryCard from "./CategoryCard";
import DiscountCard from "./DiscountCard";
import ArrowBtn from "./ArrowBtn";
import Footer from "./Footer";
import souled from "../images/souled.jpg";
import ShopCard from "./ShopCard";
import React from "react";
function Home() {
  let card = [1, 2, 3, 4, 5, 6];

  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null)
  let refArr = [scrollRef1, scrollRef2]
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

    console.log(btnName);
    console.log(refName.current)
    let maxScrollWidth =
    refName.current.scrollWidth - refName.current.clientWidth;
    console.log("max scroll:" + maxScrollWidth);

    if (btnName == "scroll-forward") {
      refName.current.scrollLeft += 350;
      console.log(refName.current.scrollLeft);

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



  return (
    <div className="home-page">
      <div className="banner-container">
        <button className="arrow-btn back-btn" name="scroll-back">
          <ArrowBack />
        </button>
        <img src="./src/images/splash1.jpg" className="bannerImg"></img>
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
          {card.map((value, index) => {
            return (
              <ShopCard
                key={index}
                category="laptop"
                name="Apple Macbook Pro"
                price="3000"
                image="650398d9dbfc73f56796eacb"
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
          {card.map((value) => {
            return (
              <CategoryCard src={value} key={value} name={"Category" + value} />
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
          {card.map((value, index) => {
            //category/image/name price
            return (
              <ShopCard
                key={index}
                category="laptop"
                name="Apple Macbook Pro"
                price="3000"
                image="650398d9dbfc73f56796eacb"
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
