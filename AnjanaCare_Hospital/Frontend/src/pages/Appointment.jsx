import React from 'react'
import Hero from '../components/Hero'
import AppointmentForm from '../components/AppointmentForm'

function Appointment() {
  return (
    <>
    <Hero title="Schedule your appointment with AnjanaCare" imageUrl={"/appointment.png"}/>
    <AppointmentForm/>
    </>
  )
}

export default Appointment
