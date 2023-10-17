/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
function CategoryCard(props) {
  const navigate = useNavigate()
  let src = 'https://ecommerce-store-backend-vop3.onrender.com/images/CategoryImages/' + props.src + '.jpg'
 
  return (
    <div className="category-card-container">
      <img src={src} className="category-img"></img>
      <div className="category-details">
        <div className="category-name-div"><p className="category-name">{props.name}</p></div>
        
        <button className="category-btn" onClick={()=>{props.clickFunc(props.name)
        navigate('/products')
        }}>Shop Now</button>
      </div>
    </div>
  );
}

export default CategoryCard;
