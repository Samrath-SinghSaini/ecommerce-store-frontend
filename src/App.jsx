/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Products from "./Components/Products";
import Error from "./Components/Error";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Admin from "./Components/Admin";
import ProductPage from "./Components/ProductPage";
import Cart from "./Components/Cart";
import Wishlist from "./Components/Wishlist";
import Access from "./Components/Access";
function App() {
  //const [authToken, setAuthToken] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setAdmin] = useState(false)
  const [loggedInUserName, setLoggedInUserName] = useState('')
  const navigate = useNavigate()
  let cookieValueArr = document.cookie.split('; ')
  let cookieValue = cookieValueArr.find((item)=> {return item.startsWith('isLoggedIn')})
  let adminCookieValue = cookieValueArr.find((item)=> {return item.startsWith('isAdmin')})
  let userNameCookieVal = cookieValueArr.find((item)=> {return item.startsWith('userName')})
  console.log(userNameCookieVal)
  let  logInCookie = false
  let adminCookie = false
  let userNameCookie = null
  if(cookieValue){
    logInCookie = cookieValue.split('=')[1]
  } 
  if(adminCookieValue){
    adminCookie = adminCookieValue.split('=')[1]
  }
  if(userNameCookieVal ){
    userNameCookie = userNameCookieVal.split('=')[1]
  }
  
  useEffect(()=>{
    console.log(`from app jsx this is the user cookie val ${userNameCookie}`)
    if(logInCookie){
      setLoggedIn(true)
    }
    if(adminCookie){
      setAdmin(true)
    }
    if(userNameCookie){
      setLoggedInUserName(userNameCookie)
    }
  }, [])
  
  function redirectPage(pageUrl, authCookie){
    if(authCookie){
      setTimeout(()=>{navigate('/products')}, 2000)
    }
    else{
      setTimeout(()=>{navigate('/access')}, 2000)
    }
  }

  function changeAuthToken(authTokenVal) {
    console.log("from app.jsx - set auth token called");
    //setAuthToken(authTokenVal);
  }
  function changeLogInState(loggedIn) {
    console.log("from app.jsx - set login called");
    setLoggedIn(loggedIn);
  }

  function changeIsAdmin(isAdmin){
    setAdmin(isAdmin)
  }
  return (
    <>
      <div>
        <Header isLoggedIn={isLoggedIn} changeLogInState={changeLogInState} />
      </div>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/login"
          element={
            <Login
              redirectPage={redirectPage}
              changeLogInState={changeLogInState}
              changeIsAdmin={changeIsAdmin}
              setUsername={setLoggedInUserName}
            />
          }
        ></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/products"
          element={
            isLoggedIn ? (
              <Products  isLoggedIn={isLoggedIn} userName={loggedInUserName}/>
            ) : (
              <Access />
            )
          }
        ></Route>
        <Route
          path="/admin"
          element={
            isLoggedIn && isAdmin? (
              <Admin isLoggedIn={isLoggedIn} />
            ) : (
              <Access />
            )
          }
        ></Route>
        <Route
          path="/wishlist"
          element={isLoggedIn ? <Wishlist isLoggedIn={isLoggedIn} userName={loggedInUserName}/> : <Access/>}
        ></Route>
        <Route
          path="/products/item/:objectId"
          element={isLoggedIn ? <ProductPage userName={loggedInUserName}/> : <Access/>}
        ></Route>
        <Route
          path="/cart"
          element={isLoggedIn ? <Cart isLoggedIn={isLoggedIn} userName={loggedInUserName}/> : <Access/>}
        ></Route>
        <Route path="/access" element={<Access />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default App;
