/* eslint-disable react/prop-types */
import FavoriteIconEmpty from "@mui/icons-material/FavoriteBorder";
import FavoriteIconFilled from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import Wishlist from "./Wishlist";
import { Link } from "react-router-dom";
import Axios from "axios";
function ShopCard(props) {
  //category/image/name price
  const [inWishList, setInWishlist] = useState(false);
  const [inCart, setInCart] = useState(false);
  let baseUrl = "https://ecommerce-store-backend-vop3.onrender.com/images/";
  let imgSrc = baseUrl + props.category + "/" + props.image + ".jpg";

  let wishListEmpty = { color: "red" };
  let wishListAdded = {
    color: "red",
  };

  let objectId = props.id;

  useEffect(() => {
    if (props.isInWishlist) {
      setInWishlist(props.isInWishlist);
    }
  }, []);

  function wishListFunc() {
    if (!inWishList) {
      setInWishlist(true);
      addToWishList(objectId);
    } else {
      setInWishlist(false);
      removeFromWishList(objectId);
    }
  }
  function cartOnClick() {
    if (!inCart) {
      setInCart(true);
      addToCart(objectId)
    } else {
      setInCart(false);
      addToCart(objectId)
    }
  }

  function addToWishList(productId) {
    let productToAdd = productId;
    let user = props.username;
    let data = {
      operation: "add",
      userName: props.userName,
      productId: productToAdd,
    };
    Axios.post("/api/user/wishlist", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("from wishlist func - an error occurred");
        console.log(err);
      });
  }
  function removeFromWishList(productId) {
    let productToRemove = productId;
    let data = {
      operation: "remove",
      userName: props.userName,
      productId: productToRemove,
    };
    Axios.post("/api/user/wishlist", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("from wishlist func - an error occurred");
        console.log(err);
      });
  }

  function addToCart(productId) {
    let productToAdd = productId;
    let user = props.username;
    let data = {
      operation: "add",
      userName: props.userName,
      productId: productToAdd,
    };
    Axios.post("/api/user/cart", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("from wishlist func - an error occurred");
        console.log(err);
      });
  }
  function removeFromCart(productId) {
    let productToRemove = productId;
    let data = {
      operation: "remove",
      userName: props.userName,
      productId: productToRemove,
    };
    Axios.post("/api/user/cart", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("from cart func - an error occurred");
        console.log(err);
      });   
  }
  return (
    <div className="card-div">
      <Link to={"/products/item/" + objectId}>
        <img src={imgSrc} className="shop-card-img" />
      </Link>
      <div className="product-detail">
        <div className="detail-div">
          <p>
            <Link to={"/products/item/" + objectId}>{props.name}</Link>
          </p>
          <p>${props.price}</p>
        </div>
        <div className="product-btn-div">
          <button onClick={wishListFunc} className="wishlist-btn">
            {inWishList ? (
              <FavoriteIconFilled style={{ fontSize: "36px" }} />
            ) : (
              <FavoriteIconEmpty style={{ fontSize: "36px" }} />
            )}
          </button>
          <button onClick={cartOnClick} className="cart-btn">
            {inCart ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default ShopCard;
