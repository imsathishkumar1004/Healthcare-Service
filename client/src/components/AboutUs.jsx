import React from "react";
import image from "../images/aboutimg.jpg";

const AboutUs = () => {
  return (
    <>
      <section className="container">
        <h2 className="page-heading about-heading">About Us</h2>
        <div className="about">
          <div className="hero-img">
            <img
              src={image}
              alt="hero"
            />
          </div>
          <div className="hero-content">
            <p>
            Welcome to Kongu Engineering College Dispensary Website, where we strive to make healthcare accessible, efficient, and patient-centric. Our platform is designed to simplify the process of scheduling doctor appointments, ensuring that you can focus on what matters most – your health.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
