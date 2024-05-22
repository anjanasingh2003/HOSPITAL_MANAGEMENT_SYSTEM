import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Login() {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        {
          email,
          password,
          role: "Patient",
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="main" style={{ display: "flex", alignItems: "center" }}>
      <div className="image">
        <img src="/signin.png" height={600} alt="" />
      </div>
      <div className="container form-component login-form">
        <h2>Sign in</h2>
        <p>Please login to continue</p>
        <p>
          The hospital login page provides authorized access for patients and
          healthcare staff to manage appointments, medical records, and other
          essential services securely. It streamlines communication and enhances
          efficiency in delivering personalized healthcare, ensuring a seamless
          experience for all users.
        </p>
        <form action="" onSubmit={handleLogin}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email..."
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password..."
          />

          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Not Registered</p>
            <Link
              to={"/register"}
              style={{ textDecoration: "none", alignItems: "center" }}
            >
              Register Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Log in</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
