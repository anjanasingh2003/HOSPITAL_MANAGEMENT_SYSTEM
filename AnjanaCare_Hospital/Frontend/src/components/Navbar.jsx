import React, { useContext, useState } from 'react'
import {Context} from "../main"
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {GiHamburgerMenu} from "react-icons/gi"
import { FaUser } from "react-icons/fa";
function Navbar() {
    const [show,setShow]=useState(false)
    const {isAuthenticated,setIsAuthenticated,user}=useContext(Context)
    const navigateTo=useNavigate()

    const handleLogout=async()=>{
       
            await axios.get("http://localhost:4000/api/v1/user/patient/logout",{
                withCredentials:true,
                
            }).then((res)=>{
                toast.success(res.data.message);
                setIsAuthenticated(false)
            }).catch((err)=>{
                toast.error(err.response.data.message)
            })
        
        }
    

const gotoLogin=()=>{
    navigateTo("/login")
}
  return (
    <nav className='container bstyle'  >
      <div className="logo">AnjanaCare</div>
      <div className={show?"navLinks showmenu":"navLinks"}>
        <div className="links">
            <Link to={"/"}>HOME</Link>
            <Link to={"/appointment"}>Appointment</Link>
            <Link to={"/myappointment"}>MyAppointment</Link>
            <Link to={"/about"}>About Us</Link>
            <Link className='profile-icon' to={"/myprofile"}><FaUser />Hi,<p className='col-purple'>{user.firstName}</p></Link>
        </div>
        {isAuthenticated?(<button className='logoutBtn btn' onClick={handleLogout}>Log out</button>):(<button className='logoutBtn btn' onClick={gotoLogin}>Log In</button>)}
      </div>
      <div className='hamburger' onClick={()=>setShow(!show)}>
        <GiHamburgerMenu/>
      </div>
    </nav>
  )
}

export default Navbar
