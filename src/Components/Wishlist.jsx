import axios from "axios";
import { Shop } from "@mui/icons-material";
import ShopCard from "./ShopCard";
import { useEffect, useState } from "react";

function Wishlist(props) {
  let itemNum = [...Array(15).fill(Number, 0)];
  let userName = props.userName;
  const [wishListArr,setWishListArr] = useState([])

  //getting username from cookies to handle refresh
  let cookieValueArr = document.cookie.split('; ')
  let userNameCookieVal = cookieValueArr.find((item)=> {return item.startsWith('userName')})
  let userNameCookie = null
  if(userNameCookieVal){
    userNameCookie = userNameCookieVal.split('=')[1]
  }
  useEffect(()=>{
    console.log('from wishlist - ')
    console.log(userName)
    userName = userNameCookie
    getWishList()
    .then((res)=>{
        console.log(res)
        setWishListArr(res)
    })
    .catch((err)=>{

    })
  }, [])
  async function getWishList() {
    try {
      let res = await axios.get("/api/user/wishlist", {
        params: { userName: props.userName },
        withCredentials:true
      });
      let wishListArr = res.data.wishListArr;
      console.log(res.data.wishListArr);

      return wishListArr;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  return (
    <div className="wishlist-div">
      <h1 className="wish-head">Your Wishlist ({itemNum.length} items)</h1>
      <div className="wish-main-container">
        {wishListArr.map((element, index) => {
          return (
            <ShopCard
              userName={userName}
              id={element._id}
              name= {element.name}
              price={element.price.$numberDecimal}
              category={element.category}
              image={element.image}
              key={index}
              isInWishlist={true}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Wishlist;
