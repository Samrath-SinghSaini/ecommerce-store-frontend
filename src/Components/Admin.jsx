import { BedroomParentRounded } from "@mui/icons-material";
import react, { useEffect, useState } from "react";
import mongoose from "mongoose";
import axios from "axios";
function Admin() {
  const [option, getOption] = useState("Products");
  const [productsVisible, setProductsVisible] = useState(true);
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [radio, setRadio] = useState("add");
  const [functionField, setFunctionField] = useState(false);
  const [btnVal, setBtnVal] = useState("Add" + option);
  const [inputVal, setInputVal] = useState("");
  const [message, setMessage] = useState("");

  function setOption(e) {
    getOption(e.target.value);
    if (e.target.value == "Products") {
      setProductsVisible(true);
      setCategoriesVisible(false);
    } else if (e.target.value == "Category") {
      setProductsVisible(false);
      setCategoriesVisible(true);
    }

  }

  useEffect(()=>{
    setBtnVal('Add ' + option)
  }, [option])
  
  function getRadioBtn(e) {
    let checkedBtn = e.target.value;
    if (checkedBtn == "update") {
      setFunctionField(true);
      setBtnVal("Update " + option);
    } else if (checkedBtn == "delete") {
      setFunctionField(true);
      setBtnVal("Delete " + option);
    } else if (checkedBtn == "add") {
      setFunctionField(false);
      setBtnVal("Add " + option);
    }
    // console.log(checkedBtn);
  }

  function submitProductForm(event) {
    event.preventDefault();
    
    const parent = event.target;
    const id = new mongoose.Types.ObjectId();
    setMessage("Request processed: " + parent.name.value);
    const data = {
      _id: id,
      name: parent.name.value,
      price: parent.price.value,
      brand: parent.brand.value,
      stock: parent.stock.value,
      category: parent.category.value,
      image: id.toString(),
      description: parent.description.value,
    };

    axios
      .post("/api/products/create", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(data);
  }

  function submitCategoryForm(event) {
    event.preventDefault();
    const parent = event.target;
    setMessage("Request processed: " + parent.name.value);
    const data = {
      name: parent.name.value,
      description: parent.description.value,
    };
    axios
      .post("/api/category/create", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        // console.log(res);
        setMessage("Successfully created a category:" + parent.name.value);
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
        setMessage("err: could not create: " + parent.name.value);
      });
  }

  function handleChange(e) {}
  return (
    <div>
      <div className="select-div">
        <select
          className="admin-select"
          value={option}
          onChange={(e) => {
            setOption(e);
          }}
        >
          <option className="admin-option">Products</option>
          <option className="admin-option">Category</option>
        </select>
      </div>
      <div className="function-div">
        <label className="func-lbl">
          Add new {option}
          <input
            className="func-input"
            type="radio"
            name="func"
            value="add"
            defaultChecked
            onClick={(e) => getRadioBtn(e)}
          ></input>
        </label>
        <label className="func-lbl">
          Update {option}
          <input
            className="func-input"
            type="radio"
            name="func"
            value="update"
            onClick={(e) => getRadioBtn(e)}
          ></input>
        </label>
        <label className="func-lbl">
          Delete {option}
          <input
            className="func-input"
            type="radio"
            name="func"
            value="delete"
            onClick={(e) => getRadioBtn(e)}
          ></input>
        </label>
      </div>
      <div
        className="admin-products"
        style={productsVisible ? { display: "block" } : { display: "none" }}
      >
        <form
          className="admin-form"
          method="post"
          action="/admin"
          onSubmit={(event) => {
            submitProductForm(event);
          }}
        >
          <div
            className="input-div"
            style={functionField ? { display: "block" } : { display: "none" }}
          >
            <div className="lbl-div">
              <label className="admin-lbl">{option} ID:</label>
            </div>
            <input type="text" name="id" className="admin-input"></input>
          </div>
          <div className="input-div">
            <div className="lbl-div">
              <label className="admin-lbl">Name:</label>
            </div>
            <input type="text" name="name" className="admin-input"></input>
          </div>
          <div className="input-div">
            <div className="lbl-div">
              <label className="admin-lbl">Price</label>
            </div>
            <input type="number" name="price" className="admin-input"></input>
          </div>
          <div className="input-div">
            <div className="lbl-div">
              <label className="admin-lbl">Brand Name</label>
            </div>
            <input type="text" name="brand" className="admin-input"></input>
          </div>
          <div className="input-div">
            <div className="lbl-div">
              <label className="admin-lbl">Stock</label>
            </div>
            <input type="text" name="stock" className="admin-input"></input>
          </div>
          <div className="input-div">
            <div className="lbl-div">
              <label className="admin-lbl">Category</label>
            </div>
            <input type="text" name="category" className="admin-input"></input>
          </div>
          <div className="input-div">
            <div className="lbl-div">
              <label className="admin-lbl">Description</label>
            </div>
            <input
              type="text"
              name="description"
              className="admin-input"
            ></input>
          </div>
          <button className="admin-btn">{btnVal}</button>
        </form>
        <label className="admin-lbl msg-lbl">{message}</label>
      </div>
      <div
        style={categoriesVisible ? { display: "block" } : { display: "none" }}
        className="admin-category"
      >
        <form
          className="admin-form"
          method="post"
          action="/admin"
          onSubmit={submitCategoryForm}
        >
          <div
            className="input-div"
            style={functionField ? { display: "block" } : { display: "none" }}
          >
            <div className="lbl-div">
              <label className="admin-lbl">{option} ID:</label>
            </div>
            <input type="text" name="id" className="admin-input"></input>
          </div>
          <div className="input-div">
            <div className="lbl-div">
              <label className="admin-lbl">Name:</label>
            </div>
            <input type="text" name="name" className="admin-input"></input>
          </div>
          <div className="input-div">
            <div className="lbl-div">
              <label className="admin-lbl">Description</label>
            </div>
            <input
              type="text"
              name="description"
              className="admin-input"
            ></input>
          </div>
          <button>{btnVal}</button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
