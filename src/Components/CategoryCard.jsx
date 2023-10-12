/* eslint-disable react/prop-types */

function CategoryCard(props) {
  let src = 'http://localhost:3000/images/categoryimages/' + props.src + '.jpg'
 
  return (
    <div className="category-card-container">
      <img src={src} className="category-img"></img>
      <div className="category-details">
        <div className="category-name-div"><p className="category-name">{props.name}</p></div>
        
        <button className="category-btn" onClick={()=>{props.clickFunc(props.name)}}>Shop Now</button>
      </div>
    </div>
  );
}

export default CategoryCard;
