import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/doctor/getall",
          { withCredentials: true }
        );
        setAppointments(data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchAppointments();
  }, []);
  // useEffect(() => {
  //   const fetchDoctors = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         "http://localhost:4000/api/v1/user/doctors",
  //         { withCredentials: true }
  //       );
  //       setDoctors(data.doctors);
  //     } catch (error) {
  //       toast.error(error.response.data.message);
  //     }
  //   };
  //   fetchDoctors();
  // }, []);

  const { isAuthenticated, doctor } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img
              src={doctor.docAvtar.url}
              alt="docImg"
              style={{ padding: "20px", borderRadius: "50%" }}
            />
            <div className="content">
              <div>
                <h5>{doctor && `${doctor.firstName} ${doctor.lastName}`} </h5>
              </div>
              <p>Departent: {doctor.doctorDepartment}</p>
              <p>WelCome to AnjanapCare....</p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>{appointments.length}</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Appointments</h5>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0
                ? appointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                      <td>{appointment.appointment_date.substring(0, 16)}</td>
                      <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                      <td>{appointment.department}</td>
                      <td>{appointment.status}</td>
                      <td>
                        {appointment.hasVisited === true ? (
                          <GoCheckCircleFill className="green" />
                        ) : (
                          <AiFillCloseCircle className="red" />
                        )}
                      </td>
                    </tr>
                  ))
                : "No Appointments Found!"}
            </tbody>
          </table>

          {}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
