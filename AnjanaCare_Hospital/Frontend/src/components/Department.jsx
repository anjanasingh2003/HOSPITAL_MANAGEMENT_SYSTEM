import React from 'react'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Department() {
    const departmentsArray = [
        {
          name: "Pediatrics",
          imageUrl: "/ped.jpg",
        },
        {
          name: "Orthopedics",
          imageUrl: "/departments/ortho.jpg",
        },
        {
          name: "Cardiology",
          imageUrl: "/cardio.jpg",
        },
        {
          name: "Neurology",
          imageUrl: "/neurology.jpg",
        },
        {
          name: "Oncology",
          imageUrl: "/departments/onco.jpg",
        },
        {
          name: "Radiology",
          imageUrl: "/departments/radio.jpg",
        },
        {
          name: "Physical Therapy",
          imageUrl: "/nursecheck.jpg",
        },
        {
          name: "Dermatology",
          imageUrl: "/doctordep.jpg",
        },
        {
          name: "ENT",
          imageUrl: "/departments/ent.jpg",
        },
      ];

    const responsive = {
        extraLarge: {
            breakpoint: { max: 3000, min: 1324 },
            items: 4,
            slidesToSlide: 1, // optional, default to 1.
          },
          large: {
            breakpoint: { max: 1324, min: 1005 },
            items: 4,
            slidesToSlide: 1, // optional, default to 1.
          },
          medium: {
            breakpoint: { max: 1005, min: 700 },
            items: 2,
            slidesToSlide: 1, // optional, default to 1.
          },
          small: {
            breakpoint: { max: 700, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
          },
      };
  return (
    <div className='container department'>
        <h2 className='red' style={{padding:"20px"}}>Department</h2>
        <div className="separater" style={{backgroundColor:"black", width:"23%",height:"2px",margin:"20px 0px"}}></div>
        <Carousel responsive={responsive} removeArrowOnDeviceType={["medium","small"]}>
            {
                departmentsArray.map((depart,index)=>{
                    return(
                        <div className='card' key={index}>
                            <div className='depart-name'>
                                {depart.name}
                            </div>
                            <img src={depart.imageUrl} alt={depart.name} />
                        </div>
                    )
                })
            }
        </Carousel>;
      
    </div>
  )
}

export default Department
