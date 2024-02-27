import React from 'react'
import './Sidebar.css'
import add_product_icon from '../Assets/Product_Cart.svg'
import list_product_icon from '../Assets/Product_list_icon.svg'
import { Link, useNavigate } from 'react-router-dom'
import logoutbutton from './shutdown.png'

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    navigate('/')
    }
  return (
    <div className='sidebar'>
      <Link to='/addproduct' style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt="" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to='/listproduct' style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="" />
          <p>Product List</p>
        </div>
      </Link>
      <div onClick={handleLogout} className="sidebar-item">
          <img src={logoutbutton} alt=""  style={{width:'40px',marginRight:"29px"}}/>
          <p>Logout</p>
        </div>
    </div>
  )
}

export default Sidebar
