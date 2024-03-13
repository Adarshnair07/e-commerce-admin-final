import React, { useLayoutEffect, useState } from "react";
import "./AddProduct.css";
import upload_area from "../Assets/upload_area.svg";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
    useLayoutEffect(()=>{
    fetch('http://localhost:4000/categories')
    .then((res) => res.json())
    .then((data) => setCategories(data))
    .then(console.log(categories))
  },[])

  const[image,setImage] = useState(false);
  const [productDetails,setProductDetails] = useState({
      name:"",
      description:"",
      image:"",
      category:"women",
      new_price:"",
      old_price:"",
      subcategory:"",
      tags:""
  });

  const AddProduct = async () => {
    
    let dataObj;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);
    
    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept:'application/json',
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {dataObj=data});

    if (dataObj.success) {
      product.image = dataObj.image_url;
      console.log(product);
      await fetch('http://localhost:4000/addproduct', {
      method: 'POST',
      headers: {
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((resp) => resp.json())
      .then((data) => {data.success?alert("Product Added"):alert("Failed")});
      
    }
  }

  const changeHandler = (e) => {
    console.log(e);
    setProductDetails({...productDetails,[e.target.name]:e.target.value});
    }

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
    }

  return (
    <div className="addproduct"> 

      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input type="text" name="name" value={productDetails.name} onChange={(e)=>{changeHandler(e)}} placeholder="Type here" />
      </div>

      <div className="addproduct-itemfield">
        <p>Description</p>
        <input type="text" name="description" value={productDetails.description} onChange={(e)=>{changeHandler(e)}} placeholder="Type here" />
      </div>

      <div className="addproduct-price">

        <div className="addproduct-itemfield">
          <p>Price</p>
          <input type="text" name="old_price" value={productDetails.old_price} onChange={(e)=>{changeHandler(e)}} placeholder="Type here" />
        </div>

        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input type="text" name="new_price" value={productDetails.new_price} onChange={(e)=>{changeHandler(e)}} placeholder="Type here" />
        </div>

      </div>

      <div className="addproduct-itemfield">
        <p>Product category</p>
        <select value={productDetails.category} name="category" className="add-product-selector" onChange={changeHandler}>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
          {categories.map((category)=>{
            return <option value={category.id}>{category.name}</option>
          })}
        </select> 
      </div>

      <div className="addproduct-itemfield">
        <p>Product image</p>
        <label for="file-input">
          <img className="addproduct-thumbnail-img" src={!image?upload_area:URL.createObjectURL(image)} alt="" />
        </label>
        <input onChange={(e)=>{imageHandler(e)}} type="file" name="image" id="file-input" hidden />
      </div>

    {/* trying to add subcat and tags */}
    <div className="addproduct-price">
    <div className="addproduct-itemfield">
        <p>Subcategory</p>
        <input type="text" name="subcategory" value={productDetails.subcategory} onChange={(e)=>{changeHandler(e)}} placeholder="Type here" />
      </div>

      <div className="addproduct-itemfield">
        <p>Tags</p>
        <input type="text" name="tags" value={productDetails.tags} onChange={(e)=>{changeHandler(e)}} placeholder="Type here" />
      </div>
      </div>



      <button className="addproduct-btn" onClick={()=>{AddProduct()}}>ADD</button>
      
      &nbsp;
      &nbsp;
      &nbsp;
     
      <Link to="/Admin" >
  <button  className="addproduct-btn" onClick={() => {AddProduct(); }}>BACK</button>
</Link>
    </div>
  );
};

export default AddProduct;
