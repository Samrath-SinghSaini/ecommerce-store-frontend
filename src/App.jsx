/* eslint-disable no-unused-vars */
import { useState } from 'react'
import {Route,Routes, Link} from 'react-router-dom'
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Products from './Components/Products';
import Error from './Components/Error'; 
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer';
import Admin from './Components/Admin';
import ProductPage from './Components/ProductPage';
import Cart from './Components/Cart'
import Wishlist from './Components/Wishlist'
function App() {

  return (
    <>
      <div>
      <Header/>
      </div>

      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/wishlist' element={<Wishlist/>}></Route>
        <Route path='/products/item' element={<ProductPage/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='*' element={<Error/>}></Route>
      </Routes>
      <div><Footer/></div>

     
    </>
  )
}

export default App
