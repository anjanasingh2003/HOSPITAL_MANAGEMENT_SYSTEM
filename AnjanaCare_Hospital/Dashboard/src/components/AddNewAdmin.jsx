import React, { useContext, useState } from 'react'
import {Context} from "../main"
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddNewAdmin = () => {
  const { isAuthenticated} = useContext(Context)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [gender, setGender] = useState("")
  const [dob, setDob] = useState("")
  const [password, setPassword] = useState("")

  const navigateTo=useNavigate();

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    try {
      const response=await axios.post("http://localhost:4000/api/v1/user/admin/addAdmin",{
        firstName,lastName,email,phone,dob,password,gender
      },{
        withCredentials:true,
        headers:{"Content-Type":"application/json"},
      });
      toast.success(response.data.message);

      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message)
      
    }

  }
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />
  }
  

  return (
    <div className="page">
    <div className='container form-component add-admin-form'>
      <h2>Welcome to AnjanaCare</h2>
      <p>Add New Admin</p>
      
      <form action="" onSubmit={handleAddNewAdmin}>
        <div>
          <input type="text" placeholder='first name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />

          <input type="text" placeholder='last name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>

        <div>
          <input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />

          <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <input type="text" placeholder='phone' value={phone} onChange={(e) => setPhone(e.target.value)} />

         
        </div>
        <div>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>

         
          <input placeholder='DOB' type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        </div>
        
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type='submit'>Add Now</button>
        </div>


      </form>
    </div>
    </div>
  )
}

export default AddNewAdmin
