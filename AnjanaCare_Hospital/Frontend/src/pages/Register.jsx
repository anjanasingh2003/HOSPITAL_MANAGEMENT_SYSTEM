import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Context } from '../main'
import axios from 'axios'
import { toast } from 'react-toastify'
function Register() {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  
  const [gender, setGender] = useState("")
  const [dob, setDob] = useState("")
  const [password, setPassword] = useState("")


  const navigateTo = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response=await axios.post("http://localhost:4000/api/v1/user/patient/register",{
        firstName,lastName,email,phone,dob,password,gender,role:"Patient"
      },{
        withCredentials:true,
        headers:{"Content-Type":"application/json"},
      });
      toast.success(response.data.message);
      setIsAuthenticated(true)
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message)
      
    }

  }
  if (isAuthenticated) {
    return <Navigate to={"/"} />
  }
  



  return (
    <div className="main" style={{ display: "flex", alignItems: "center" }}>
      <div className="image animated-image">
        <img src="/signup.png" height={600} alt="" />
      </div>
      <div className="container form-component register-form">
        <h2>Sign Up</h2>
        <p>Please Register to continue</p>
        <p>
          The hospital registration page allows new patients to easily create
          accounts, providing essential information and facilitating appointment
          booking. It ensures a smooth onboarding process, enabling efficient
          management of patient data and healthcare services.
        </p>
        <form action="" onSubmit={handleRegister}>
          <div>
            <input
              type="text"
              placeholder="first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              type="text"
              placeholder="last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>

            <label for="dateofbirth">Date Of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Already Registered?</p>
            <Link
              to={"/login"}
              style={{ textDecoration: "none", alignItems: "center" }}
            >
              login Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Register Here</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register
