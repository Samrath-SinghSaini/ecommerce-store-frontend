import { Route, Routes } from "react-router-dom";
import ProductCard from "./ProductCard";
import ArrowForward from "@mui/icons-material/ArrowForwardIos";
import ArrowBack from "@mui/icons-material/ArrowBackIos";
import CategoryCard from "./CategoryCard";
import DiscountCard from "./DiscountCard";
import ArrowBtn from "./ArrowBtn";
import Footer from './Footer'
import souled from '../images/souled.jpg'
function Home() {
  let card = [1, 2, 3, 4, 5, 6];

  return (
    <div className="home-page">
      <div className="banner-container">
        <button className="arrow-btn back-btn">
          <ArrowBack />
        </button>
        <img src="./src/images/splash1.jpg" className="bannerImg"></img>
        <button className="arrow-btn forward-btn">
          <ArrowForward />
        </button>
      </div>
      <div className="home-product-container">
        <h1>Top Selling Products For you</h1>

        <div className="card-container">
          <button className="arrow-btn back-btn">
            <ArrowBack />
          </button>
          {card.map((value) => {
            return <ProductCard key={value} src={souled} name='product 1' price='1500'/>;
          })}
          <button className="arrow-btn forward-btn">
            <ArrowForward />
          </button>
        </div>
      </div>
      <div className="home-categories-container">
        <h1 className="categories-heading">Browse By Categories</h1>
        <div className="categories-card-container">
          {card.map((value) => {
            return (
              <CategoryCard
                src={"./src/images/category/category" + value + ".jpg"}
                key={value}
                name={"Category" + value}
              />
            );
          })}
        </div>
      </div>
      <div className="home-product-container">
        <button className="arrow-btn back-btn">
            <ArrowBack />
          </button>
        <div className="card-container">
          {card.map((value) => {
            return <DiscountCard key={value} />;
          })}
          <button className="arrow-btn forward-btn">
            <ArrowForward />
          </button>
        </div>
      </div>
      <div className="footer-container">
          
      </div>
    </div>
  );
}
export default Home;
