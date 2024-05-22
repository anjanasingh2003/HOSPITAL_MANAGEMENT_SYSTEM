import React from 'react'
import { Link } from 'react-router-dom'
import { MdEmail } from "react-icons/md"
import { FaLocationArrow, FaPhone } from 'react-icons/fa'
function Footer() {
    const hours = [
        {
            id: 1,
            day: "Sunday",
            time: " 9:00 AM-11:00"
        },
        {
            id: 2,
            day: "Monday",
            time: " 9:00 AM-11:00"
        },
        {
            id: 3 ,
            day: "Tuesday",
            time: " 9:00 AM-11:00"
        },
        {
            id: 4,
            day: "Wednesday",
            time: " 9:00 AM-11:00"
        },
        {
            id: 5,
            day: "Thrusday",
            time: " 9:00 AM-11:00"
        },
        {
            id: 6,
            day: "Friday",
            time: " 9:00 AM-11:00"
        },
        {
            id: 7,
            day: " Saturday",
            time: " Emergency Only"
        },

    ]
    return (
        <>
            <footer className='container'>
                <hr />
                <div className="content">
                    <div>
                        <h2 className='red'>Anjana Care</h2>
                        <p>AnjanaCare provides an extensive array of medical services aimed at ensuring a comfortable</p>
                    </div>
                    <div>
                        <h4>Quick Links</h4>
                        <ul>
                            <Link to={"/"}>Home</Link>
                            <Link to={"/appointment"}>Appointment</Link>
                            <Link to={"/about"}>About</Link>
                        </ul>
                    </div>
                    <div>
                        <h4>Hours</h4>
                        {
                            hours.map((element) => {
                                return (
                                    <li key={element.id}>
                                        <span>{element.day}</span>
                                        <span>{element.time}</span>
                                    </li>
                                )
                            })
                        }
                    </div>
                    <div>
                        <h4>Contact:</h4>
                        <div>
                            <FaPhone />
                            <span>8982520794</span>
                        </div>
                        <div>
                            <MdEmail />
                            <span>anjana20033@gmail.com</span>
                        </div>
                        <div>
                            <FaLocationArrow />
                            <span>Kolar, Bhopal</span>
                        </div>

                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer
