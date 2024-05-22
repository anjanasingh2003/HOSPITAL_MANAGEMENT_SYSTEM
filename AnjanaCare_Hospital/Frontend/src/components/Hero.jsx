import React from "react";

function Hero({ title, imageUrl }) {
  return (
    <div className="hero container">
      <div className="banner">
        <h1 className="red">{title}</h1>

        <p>
          AnjanaCare provides an extensive array of medical services aimed at
          ensuring a comfortable and stress-free experience for individuals
          seeking care. Our adept and multilingual medical professionals,
          equipped with high-level training, deliver personalised and
          compassionate healthcare tailored to meet the unique needs of each
          patient{" "}
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero" className="animated-image" />
        <span>
          <img src="/vector.png" alt="vector" />
        </span>
      </div>
    </div>
  );
}

export default Hero;
