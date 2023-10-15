import { useState } from "react";
import dotenv from 'dotenv'

/* eslint-disable react/prop-types */
function CategoryVal(innerProp) {
  // let isChecked = false
  
  

  function onClickFunc(e) {
    let heading = innerProp.heading;
 
    if (heading == "Category") {
      innerProp.callThis(e.target.name,e.target.checked);
    } else if (heading == "Brands") {
      innerProp.callThis(e.target.name,  e.target.checked);
    } else if (heading == "Price") {
      let priceString = e.target.name;
      let min = 0;
      let max = 0;
      switch (priceString) {
        case "Under $100":
          min = 1;
          max = 99;
          break;
        case "$100 to $499":
          min = 100;
          max = 499;
          break;
        case "$500 to $799":
          min = 500;
          max = 799;
          break;
        case "$800 to $1499":
          min = 800;
          max = 1499;
          break;
        case "$1500 and over":
          min = 1500;
          max = Number.MAX_SAFE_INTEGER;
      }

      innerProp.callThis(min, max, e.target.checked);
    }
  }

  let brand = "apple";
  return (
    <label value="css" className="sidebar-lbl">
      <input
        type="checkbox"
        onChange={(e) => {
          onClickFunc(e);
        }}
        name={innerProp.value}
        className="sidebar-checkbox"
      ></input>
      {innerProp.value}
    </label>
  );
}

function SidebarCategory(props) {
  let valueArr = [];
  valueArr = props.valueArr;
  let heading = props.heading;
  // sortBrand={(name)=>{props.sortBrand(name)}}

  return (
    <>
      <h3 className="sidebar-heading">{props.heading}</h3>
      {valueArr.map((element, index) => {
        return (
          <CategoryVal
            value={element}
            key={index}
            callThis={props.sortBrand}
            heading={props.heading}
            length={valueArr.length}
            id={index}
          />
        );
      })}
    </>
  );
}

export default SidebarCategory;
