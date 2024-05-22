import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Doctors = () => {
  const [myAppointments, SetMyAppointments] = useState([]);
  const { isAuthenticated } = useContext(Context);
  useEffect(() => {
    const fetchMyAppointment = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/user/getall",
          { withCredentials: true }
        );
        SetMyAppointments(data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchMyAppointment();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="myappointment" >
      
      <div className="banner boder-outline" >
        <table className="center">
          <thead>
            <tr>
              <th style={{padding:"40px"}}>Appointment Date</th>
              <th style={{padding:"40px"}}>Appointment Status</th>
              <th style={{padding:"40px"}}>Department</th>
              <th style={{padding:"40px"}}>Doctor Name</th>
            </tr>
            
          </thead>
          <tbody>
            
          {myAppointments && myAppointments.length > 0 ? (
          myAppointments.map((element) => (
            <tr key={element._id}> 
            <td style={{padding:"10px"}}>{element.appointment_date}</td>
            <td style={{padding:"10px"}}>{element.status}</td>
            <td style={{padding:"10px"}}>{element.department}</td>
            <td style={{padding:"10px"}}>{element.doctor.firstName} {element.doctor.lastName}</td>
            </tr>
          ))
        ) : (
          <h5>No appointment Found!</h5>
        )}

          </tbody>
        </table>
        
      </div>
    </section>
  );
};

export default Doctors;