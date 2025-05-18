import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-left">
        <img src="/images/icons/logo.png" alt="Furever Logo" />
      </div>
      <div className="about-right">
        <h2>About Furever</h2>
        <p>
          Furever is a heartfelt platform dedicated to connecting loving humans with pets in need of a forever home. 
          Our mission is to ensure every pet finds a warm, welcoming family.
        </p>
        <p>
          We collaborate with shelters, rescue centers, and volunteers to streamline the adoption process, making it easier and more joyful for everyone involved.
        </p>
        <p>
          Whether you're looking for a playful pet, a calm companion, or a furry friend to brighten your days, Furever is here to help.
        </p>
      </div>
    </div>
  );
};

export default About;
