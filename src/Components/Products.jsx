/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { PropaneSharp, Shop } from "@mui/icons-material";
import ShopCard from "./ShopCard";
import SidebarCategory from "./Mods/SidebarCategory";
import { useEffect, useState, useRef } from "react";
import Axios from "axios";
import {Link} from 'react-router-dom'

/* 
I have a bad habit of never commenting my code but this file is so messy that I feel a moral responsibility to explain this stuff in case any human ever comes across it

so this file fetches and renders all the products that are in the database and handles the filters as well 

although the filters are giving me a hard time at the moment and making me question my worth as a programmer 

We fetch all the products from the data base and add it to the products array using useState. 
That is simple enough 
the filters make it complicated 

*/

export default function Products(props) {

  //here we have all the different useState arrays where the different products and categories are stores 
  const [productsArr, setProductsArr] = useState([]);
  const [categoryArr, setCategoryArr] = useState([]);
  const [brandsArr, setBrandsArr] = useState([]);
  const [productFilterArr, setProductFilterArr] = useState([]);
  let authToken = props.authToken
  console.log('auth token val: ')
  console.log(authToken)
  //temp arrays to help manage data 
  let tempBrandArr = []
  let tempPriceArr = [];
  let tempCategoryArr = [];

  //after all the logic is handled for fetching and sorting, the requested data is entered to this final array
  const [finalArr, setFinalArr] = useState(productsArr);
  console.log('cookie hai yeh')
  console.log(document.cookie)

  //price filter values 
  let priceFilter = [
    "Under $100",
    "$100 to $499",
    "$500 to $799",
    "$800 to $1499",
    "$1500 and over",
  ];
  let initProductArr = productsArr;

  //fetching products and categories 
  async function getProducts() {
    try {
      console.log('from products')
      
      let res = await Axios.get("/api/products/fetch", {
        headers:{
          'Authorization':`Bearer ${authToken}`
        },
        withCredentials:true
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return [-1];
    }
  }
  async function getCategories() {
    try {
      let res = await Axios.get("/api/category/fetch");
      return res.data;
    } catch (err) {
      console.log(err);
      return [-1];
    }
  }

  //getting brands from the products to add to filters 
  function getBrands() {
    let tempArr = [];
    productFilterArr.map((element) => {
      if (tempArr.indexOf(element.brand) == -1) {
        tempArr.push(element.brand);
      }
    });
    return tempArr;
  }

  //use effect hook for setting the products array after fetching. Same for categories 
  useEffect(() => {
    getProducts()
      .then((res) => {
        setProductsArr(res);
        setProductFilterArr(res);
      })
      .catch((err) => {
        setProductsArr([-1]);
      });

    getCategories()
      .then((res) => {
        let tempCat = [];
        res.map((element) => {
          tempCat.push(element.name);
        });
        setCategoryArr(tempCat);
      })
      .catch((err) => {
        setCategoryArr([-1]);
      });
  }, []);

  //this hook is specific to brands in the sidebar 
  useEffect(() => {
    let brand = getBrands();
    setBrandsArr(brand);
  }, [productFilterArr]);


  //this hook is used to set the initial value of the final array to the products array after the items are fetched and added to the products array 
  useEffect(() => {
    setFinalArr(productsArr);
  }, [productsArr]);
  

  //this is the sort function. This has made me question my existence and taken the greater part of my last two days. it is supposed to sort the products based on the selected checkbox value. and set it to the products array once again when the box is unchecked. I have implemented that already but cannot figure out how to handle the data when multiple checkboxes are selected. 
  function sortBrand(brandName, isChecked) {
    let carryOverArr = tempBrandArr;
    let funcArr = [];
    let checkbox = isChecked
    console.log("isChecked is " + isChecked);
    
    if (checkbox) {
      productsArr.map((element, index) => {
        if (element.brand == brandName) {
          tempBrandArr.push(element);
        }
      });
      setFinalArr((prevVal)=>{
        console.log('setfinal triggered')
        let newArr = [...prevVal, tempBrandArr]
        console.log(newArr)
        return tempBrandArr
      });
      checkbox = false;
    } else {
      setFinalArr(productsArr);
    }
  }
  function sortCategory(categoryName, isChecked) {
    productsArr.map((element, index) => {
      if (element.category == categoryName) {
        tempCategoryArr.push(element);
      }
    });

    if (isChecked) {
      setFinalArr(tempCategoryArr);
    } else {
      setFinalArr(productsArr);
    }
  }

  function sortPrice(minPrice, maxPrice, isChecked) {
    productsArr.map((element, index) => {
      let price = element.price.$numberDecimal;
      if (price >= minPrice && price <= maxPrice) {
        tempPriceArr.push(element);
      }
    });
    if (isChecked) {
      setFinalArr(tempPriceArr);
    } else {
      setFinalArr(productsArr);
    }
  }



  // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    <div className="product-page">
      <div className="product-banner">
        <img src="/src/images/splash2.jpg" className="product-banner-img"></img>
      </div>

      <div className="product-div">
        <div className="sidebar">
          <SidebarCategory
            valueArr={categoryArr}
            heading="Category"
            // sortBrand={sortBrand}
            sortBrand={(brandName, isChecked) => {
              sortCategory(brandName, isChecked);
            }}
          />
          <SidebarCategory
            valueArr={brandsArr}
            heading="Brands"
            sortBrand={(brandName, isChecked) => {
              sortBrand(brandName, isChecked);
            }}
          />
          <SidebarCategory
            valueArr={priceFilter}
            heading="Price"
            sortBrand={(min, max, isChecked) => {
              sortPrice(min, max, isChecked);
            }}
          />
        </div>
        <div className="product-main">
          <div className="products-info-div">
            <div className="product-info">
              <p>
                <a href="/">Home</a>/<a href="/products">Products</a>
              </p>
              <p>All Products </p>
              <p>{finalArr.length} Items</p>
            </div>
            <div className="sort-div">
              <label form="sort" className="sort-lbl">
                Sort{" "}
              </label>
              <select name="sort" id="sort" className="sort-menu">
                <option value={"A to Z"} className="sort-option">
                  A to Z
                </option>
                <option value={"High to Low"} className="sort-option">
                  High to Low
                </option>
                <option value={"Low to High"} className="sort-option">
                  Low to High
                </option>
                <option value={"Highest Rated"} className="sort-option">
                  Highest Rated
                </option>
              </select>
            </div>
            {finalArr.map((element, index) => {
              //image, category, name, price

              return (
                <ShopCard
                  key={index + 1}
                  image={element.image}
                  category={element.category}
                  name={element.name}
                  price={element.price.$numberDecimal}
                  id={element._id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
