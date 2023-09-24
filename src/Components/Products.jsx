/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { PropaneSharp, Shop } from "@mui/icons-material";
import ShopCard from "./ShopCard";
import SidebarCategory from "./Mods/SidebarCategory";
import { useEffect,useState, useRef } from "react";
import Axios from 'axios'
export default function Products(){  
    const [productsArr, setProductsArr] = useState([])
    const [categoryArr, setCategoryArr] = useState([])
    const [brandsArr, setBrandsArr] = useState([])
    let priceFilter = ['Under $100', '$100 to $499','$500 to $799', '$800 to $1499', '$1500 and over' ]
    async function getProducts(){

        try{
       let res = await Axios.get('/api/products/fetch')
       return res.data

    }   catch(err){
        console.log(err)
        return [-1]
    }
    }
    async function getCategories(){

        try{
       let res = await Axios.get('/api/category/fetch')
       return res.data

    }   catch(err){
        console.log(err)
        return [-1]
    }
    }
    function getBrands(){
        let tempArr = []
        productsArr.map((element)=>{
            if(tempArr.indexOf(element.brand) == -1){
                tempArr.push(element.brand)
            }            
        })
        return tempArr
    }
    useEffect(()=>{
        getProducts()
        .then((res)=>{
            setProductsArr(res)
            
        })
        .catch((err)=>{
            setProductsArr([-1])
        })

        getCategories()
        .then((res)=>{
            let tempCat = []
            res.map((element)=>{
                tempCat.push(element.name)
            })
            setCategoryArr(tempCat)
        })
        .catch((err)=>{
            setCategoryArr([-1])
        })
    }, [])

    useEffect(()=>{
        let brand = getBrands()
        setBrandsArr(brand)
    }, productsArr)
    console.log(categoryArr)
      
    
    
   
   // eslint-disable-next-line react-hooks/exhaustive-deps
       return <div className="product-page">
    <div className="product-banner">
        <img src="/src/images/splash2.jpg" className="product-banner-img"></img>
    </div>
    
    <div className="product-div">
    
    <div className="sidebar">
        <SidebarCategory valueArr={categoryArr} heading='Category'/>
        <SidebarCategory valueArr={brandsArr} heading='Brands'/>
        <SidebarCategory valueArr={priceFilter} heading='Price'/>
        
    </div>
    <div className="product-main">
    <div className="products-info-div">
    <div className="product-info"><p><a href="/">Home</a>/<a href='/products'>Products</a></p>
        <p>All Products </p><p>{productsArr.length} Items</p></div>
        <div className="sort-div">
        <label form="sort" className="sort-lbl">Sort </label>
        <select name="sort" id="sort" className="sort-menu">
        
            <option value={'A to Z'} className="sort-option">A to Z</option>
            <option value={'High to Low'} className="sort-option">High to Low</option>
            <option value={'Low to High'} className="sort-option">Low to High</option>
            <option value={'Highest Rated'} className="sort-option">Highest Rated</option>
        </select>
        </div>
    {productsArr.map((element, index)=>{
         //image, category, name, price
        
        return <ShopCard key={index+1} image={element.image} category={element.category} name={element.name} price={element.price.$numberDecimal}/>
    })}
    </div>
    </div>
    </div>
    </div>
}
