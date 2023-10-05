/* eslint-disable react/prop-types */

function CategoryCard(props) {
  let src = 'http://localhost:3000/images/categoryimages/category' + props.src + '.jpg'
 
  return (
    <div className="category-card-container">
      <img src={src} className="category-img"></img>
      <div className="category-details">
        <p className="category-name">{props.name}</p>
        <button className="category-btn">Shop Now</button>
      </div>
    </div>
  );
}

export default CategoryCard;
