import React, { useContext } from 'react'
import { Context } from '../main';
import { MdEmail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";


function Myprofile() {

    
  const { isAuthenticated, user } = useContext(Context);
  return (
    <div className='profile-container'>
        <div className="profile-content">
            <div className="userAvtar">
            <img src="./userav.png" alt="" />
                <p><b>{user.firstName} {user.lastName}</b></p>
            </div>
            <div className="user_detail">
                <p><MdEmail/> {user.email}</p>
                <p><IoCallOutline /> {user.phone}</p>
                <p></p>
            </div>
        </div>
      
    </div>
  )
}

export default Myprofile
