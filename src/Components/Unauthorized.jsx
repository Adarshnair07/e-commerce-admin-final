import React from 'react'
import '../Components/ListProduct/ListProduct.css'
import Image from '../Components/Assets/unauth.svg'
import { Link, useNavigate } from 'react-router-dom'
const Unauthorized = () => {
    const navigate = useNavigate();
  return (
    <div style={{height:'100vh',width:'100vw',display:'grid',placeItems:'center',marginTop:'100'}}>
        <img src={Image} style={{height:'60vh',width:'auto'}}/>
        <button onClick={()=>navigate('/')} className='addproduct-btn' style={{marginTop:'-300px'}}>Login</button>
        </div>
  )
}

export default Unauthorized