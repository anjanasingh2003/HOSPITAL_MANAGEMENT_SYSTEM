import React from "react";

function Biography({ imageUrl }) {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="Abpoutimg" />
      </div>
      <div className="banner">
        <h3 className="red">Who we are</h3>
        <div
          className="separater"
          style={{
            backgroundColor: "black",
            width: "40%",
            height: "2px",
            margin: "20px 0px",
          }}
        ></div>
        <p>
          AnjanaCare Hospital and Medical, strategically located at kolar,
          Bhopal, is a private hospital providing ethical and personalized care
          within an infrastructure on par with the best facility in the country.
          CNHMI commenced its operation in December 2013, offering both
          out-patient services and in-patient services.
        </p>

        <p>
          To meet these developing needs and to determine the expanded interest
          for specific pediatric preparing and human services benefits, the
          legislature of Nepal set up a task for the extension of the KCH and
          made a solicitation to the administration of japan for award help for
          the undertaking in the year 1993 AD..
        </p>

        <p>Lorem, ipsum dolor.</p>
      </div>
    </div>
  );
}

export default Biography;
