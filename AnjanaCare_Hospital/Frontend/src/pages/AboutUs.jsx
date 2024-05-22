import React from 'react'
import Hero from '../components/Hero'
import Biography from '../components/Biography'
function AboutUs() {
  return (
    <>
      <Hero title={"Learn More About Us, Anjana Care"} imageUrl={"/about.png"}/>
      <Biography imageUrl={"/whoweare.png"}/>
    </>
  )
}

export default AboutUs