import React, { useEffect, useState } from "react";
import "./EditProduct.css";
import upload_area from "../Assets/upload_area.svg";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const EditProduct = () => {
    const { productid } = useParams();
    const [products, setProducts] = useState();
    useEffect(() => {
        fetch('http://localhost:4000/allproducts') 
              .then((res) => res.json()) 
              .then((data) => {setProducts(data);
            console.log(data);
            let itemInfo = data.find((product) => product._id === productid);
            console.log(itemInfo);
            setProductDetails(itemInfo);
        })
    },[])  
    useEffect(() => {
      if(products){
        let itemInfo = products.find((product) => product._id === Number(productid));
        console.log(itemInfo);
      }
    },[])   
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
      name: "",
      description: "",
      image: "",
      category: "women",
      new_price: "",
      old_price: "",
      subcategory: "",
      tags: ""
    });
  
    const editProduct = async () => {
        console.log(productDetails);
      try {
        let formData = new FormData();
        if (image) {
          formData.append("product", image);
          const response = await fetch("http://localhost:4000/upload", {
            method: "POST",
            body: formData
          });
          const data = await response.json();
          
          if (data.success) {
            setProductDetails({ ...productDetails, image: data.image_url });
          } else {
            throw new Error("Image upload failed");
          }
        }
  
        const response = await fetch(
          `http://localhost:4000/editproduct/${productDetails._id}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(productDetails)
          }
        );
        const data = await response.json();
        if (data.success) {
          alert("Product Updated");
        } else {
          throw new Error("Product update failed");
        }
      } catch (error) {
        console.error("Error editing product:", error);
        alert("Failed to edit product");
      }
    };
  
    const changeHandler = (e) => {
      setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };
  
    const imageHandler = (e) => {
      setImage(e.target.files[0]);
    };

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



      <button className="addproduct-btn" onClick={() => editProduct()}>
        EDIT
      </button>
      
      &nbsp;
      &nbsp;
      &nbsp;
     
      {/* <Link to="/Admin" >
  <button  className="addproduct-btn" onClick={() => {AddProduct(); }}>BACK</button>
</Link> */}
    </div>
  );
};

export default EditProduct;
