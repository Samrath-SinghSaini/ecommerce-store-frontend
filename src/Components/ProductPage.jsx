/* eslint-disable react/prop-types */
import { keyframes } from "@emotion/react";
import Star from "@mui/icons-material/GradeRounded";
import { style } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import ArrowForward from "@mui/icons-material/ArrowForwardIos";
import souled from "../images/souled.jpg";
import ArrowBack from "@mui/icons-material/ArrowBackIos";
import { useParams } from "react-router-dom";
import Axios from "axios";
function ProductPage(prop) {
  let { objectId } = useParams();
  const [productInfo, setProductInfo] = useState({});
  console.log("requested id is: " + objectId);
  let ratingArr = [...Array(5).fill(false)];
  let card = [1, 2, 3, 4, 5, 6];
  let rating = useRef(ratingArr);
  let starFillStyle = {
    color: "Yellow",
  };
  let starBlankStyle = {
    color: "white",
  };
  let loremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";

  async function getProductInfo() {
    await Axios.get("/api/products/item/" + objectId)
      .then((res) => {
        let serverResponse = res;
        setProductInfo(serverResponse.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getProductInfo();
    window.scrollTo(0,0)
  },[]);
  function handleClick(index) {
    let tempArr = ratingArr;
    for (let i = 0; i < 5; i++) {
      if (i <= index) {
        tempArr[i] = true;
      } else {
        tempArr[i] = false;
      }
    }
    rating.current = tempArr;
  }
  useEffect(() => {
    console.log(rating.current);
  }, [rating.current]);

  (() => {
    console.log(productInfo);
  })();

  let imgBaseUrl = "https://ecommerce-store-backend-vop3.onrender.com/images/";
  return (
    <div className="product-page">
      <div className="item-parent-container">
        <div className="item-img-div">
          <img
            className="item-img"
            src={imgBaseUrl + "/" + productInfo.category + "/" + productInfo.image + ".jpg"}
          ></img>
        </div>
        <div className="item-info">
          <h1>{productInfo.name}</h1>
          <p>{productInfo.category}</p>
          <p>By: {productInfo.brand}</p>
          <h3>$ {productInfo.price}</h3>
          <div className="review-div">
            {[...Array(5)].map((element, index) => {
              return (
                <>
                  <Star
                    key={index}
                    value={index}
                    onClick={() => {
                      handleClick(index);
                    }}
                    style={rating[index] ? starFillStyle : starBlankStyle}
                    className="rating-icon"
                  />
                </>
              );
            })}
          </div>
          <button>Add to Cart 🛒</button>
          <button>Add to Wishlist 💟</button>
          <div className="description-div">
            <h4>Product Description</h4>
            <p>{productInfo.description}</p>
          </div>
        </div>
      </div>
      <div className="user-review-div">
        <h2>User Reviews</h2>
        <UserReview
          heading="Great Product"
          review={loremIpsum}
          userName="IndoriPatiala"
        />
      </div>
      <div className="similar-product-div">
        <h2>Similar Products</h2>
        <div className="card-container">
          <button className="arrow-btn back-btn">
            <ArrowBack />
          </button>
          {card.map((value) => {
            return <ProductCard key={value} src={souled} />;
          })}
          <button className="arrow-btn forward-btn">
            <ArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
}
function UserReview(props) {
  return (
    <>
      <h3>{props.heading}</h3>
      <p>By User: {props.userName}</p>
      <div className="user-rating-div"></div>
      <p>{props.review}</p>
    </>
  );
}
export default ProductPage;
