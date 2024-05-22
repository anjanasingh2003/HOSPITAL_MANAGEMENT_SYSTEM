import React, { useContext, useState } from 'react'
import { Context } from "../main";
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const navigateTo = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:4000/api/v1/user/login", {
        email, password, role: "Doctor"
      }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
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
    <>
    <div className="main dark_white" style={{display:"flex",alignItems:"center"}}>
       <div className="image animated-image">
      <img src="/adlogin.png" alt="" />
    </div>
      <div className='container form-component'>

        <h2>Welcome to Anjana Care</h2>
        <p>Doctor Login</p>
        <form action="" onSubmit={handleLogin}>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email...' />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password...' />
         
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type='submit'>Log in</button>
          </div>

        </form>
      </div>
      </div>
    </>
  )
}

export default Login
