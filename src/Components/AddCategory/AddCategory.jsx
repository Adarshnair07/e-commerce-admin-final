import React, { useState } from "react";
import upload_area from "../Assets/upload_area.svg";
import '../AddCategory/AddCategory.css'

const AddCategory = () => {
    const [image, setImage] = useState(false);
    const [categoryDetails, setCategoryDetails] = useState({
      name: "",
      banner: "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setCategoryDetails({ ...categoryDetails, [name]: value });
    };
  
    const imageHandler = (e) => {
      setImage(e.target.files[0]);
    };

    const AddCategory = async () => {
        try {
            const formData = new FormData();
            formData.append('product', image);
            
            const response = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Failed to upload image');
            }
    
            const data = await response.json();
    
            if (data.success) {
                const category = { ...categoryDetails, banner: data.image_url };
                console.log(category);
    
                const categoryResponse = await fetch('http://localhost:4000/addcategory', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(category),
                });
    
                if (!categoryResponse.ok) {
                    throw new Error('Failed to add category');
                }
    
                const categoryData = await categoryResponse.json();
                if (categoryData.success) {
                    alert("Category Added");
                } else {
                    throw new Error('Failed to add category');
                }
            } else {
                throw new Error('Image upload failed');
            }
        } catch (error) {
            console.error('Error:', error.message);
            alert("Failed to add category");
        }
    };
    
    return (
      <div className="addcategory">
        <div className="addcategory-itemfield">
          <p>Category Name</p>
          <input
            type="text"
            name="name"
            value={categoryDetails.name}
            onChange={handleChange}
            placeholder="Type here"
          />
        </div>
  
        <div className="addcategory-itemfield">
        <p>Product image</p>
        <label for="file-input">
          <img className="addcategory-thumbnail-img" src={!image?upload_area:URL.createObjectURL(image)} alt="" />
        </label>
        <input onChange={(e)=>{imageHandler(e)}} type="file" name="image" id="file-input" hidden />
      </div>
  
        <button className="addcategory-btn" onClick={AddCategory}>
          ADD CATEGORY
        </button>
      </div>
    );
};

export default AddCategory;
