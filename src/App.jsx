/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
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
  const [authToken, setAuthToken] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  function changeAuthToken(authTokenVal) {
    console.log("from app.jsx - set auth token called");
    setAuthToken(authTokenVal);
  }
  function changeLogInState(loggedIn) {
    console.log("from app.jsx - set login called");
    setLoggedIn(loggedIn);
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
              setAuthToken={changeAuthToken}
              changeLogInState={changeLogInState}
            />
          }
        ></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/products"
          element={
            isLoggedIn ? (
              <Products authToken={authToken} isLoggedIn={isLoggedIn} />
            ) : (
              <Access />
            )
          }
        ></Route>
        <Route
          path="/admin"
          element={
            isLoggedIn ? (
              <Admin authToken={authToken} isLoggedIn={isLoggedIn} />
            ) : (
              <Access />
            )
          }
        ></Route>
        <Route
          path="/wishlist"
          element={isLoggedIn ? <Wishlist isLoggedIn={isLoggedIn}/> : <Access/>}
        ></Route>
        <Route
          path="/products/item/:objectId"
          element={isLoggedIn ? <ProductPage/> : <Access/>}
        ></Route>
        <Route
          path="/cart"
          element={isLoggedIn ? <Cart authToken={authToken} isLoggedIn={isLoggedIn} /> : <Access/>}
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
