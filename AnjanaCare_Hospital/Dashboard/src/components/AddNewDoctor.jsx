import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const AddNewDoctor = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvtar, setDocAvtar] = useState("");
  const [docAvtarPreview, setDocAvtarPreview] = useState("");

  const navigateTo = useNavigate();

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvtarPreview(reader.result);
      setDocAvtar(file);
    };
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvtar", docAvtar);
      await axios
        .post("http://localhost:4000/api/v1/user/doctor/addnew", formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          
          setDob("");
          setGender("");
          setPassword("");
          setDocAvtar("")
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="page">
      <section className="container add-doctor-form ">
        <img src="/signup.png" alt="logo" height={200} className="logo"/>
        <h1 className="form-title">REGISTER A NEW DOCTOR</h1>
        <form onSubmit={handleAddNewDoctor} >
          <div className="first-wrapper">
            <div>
              <img
                src={
                  docAvtarPreview ? `${docAvtarPreview}` : "/docHolder.png"
                }
                alt="Doctor Avtar"
              />
              <input type="file" onChange={handleAvatar} />
            </div>
            <div>
              <div className="fullname" style={{display:"flex",gap:"2px"}}>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                />
                </div>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="number"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
             {/*  <input
                type="number"
                placeholder="NIC"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
              /> */}
              <input
                type={"date"}
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <select
                value={doctorDepartment}
                onChange={(e) => {
                  setDoctorDepartment(e.target.value);
                }}
              >
                <option value="">Select Department</option>
                {departmentsArray.map((depart, index) => {
                  return (
                    <option value={depart} key={index}>
                      {depart}
                    </option>
                  );
                })}
              </select>
              <button type="submit">Register New Doctor</button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewDoctor;