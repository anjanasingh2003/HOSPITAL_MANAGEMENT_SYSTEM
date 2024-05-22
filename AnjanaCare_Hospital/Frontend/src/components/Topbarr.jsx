import React from 'react'
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
function Topbarr() {
  return (
    <div style={{backgroundColor:"purple", width:"100%",height:"5vh",lineHeight:"3.5vh"}}>
      <div className="content" style={{ width:"85%",height:"4vh",margin:"auto auto",display:"flex"}}>
        <p style={{fontSize:"15px",color:"white",padding:"2px",display:"flex",justifyContent:"flex-start",alignItems:"center",gap:"3px"}}><IoMdCall /> 8982520794</p>

        <p style={{fontSize:"15px",color:"white",padding:"2px",display:"flex",justifyContent:"flex-start",alignItems:"center",gap:"3px"}}><MdEmail /><a href="https://mail.google.com/mail/" style={{ fontSize:"15px",listStyle:"none",textDecoration:"none",color:"white"}}>anjana20033@gmail.com</a></p>

        <p style={{fontSize:"15px",color:"white",padding:"2px",display:"flex",justifyContent:"flex-start",alignItems:"center",gap:"3px"}}><MdLocationOn /><a href="https://mail.google.com/mail/" style={{ fontSize:"15px",listStyle:"none",textDecoration:"none",color:"white"}}>Kolar, Bhopal</a></p>
      </div>
      
    </div>
  )
}

export default Topbarr

