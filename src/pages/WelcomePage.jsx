import React from "react";
import { useNavigate } from "react-router"; 


const WelcomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/display"); 
  };

  return (
    <div className="welcome-page">
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to Digital Library</h1>
          <p>
            Explore a world of knowledge, stories, and inspiration. Your next
            favorite book is just a click away.
          </p>
          <button className="explore-button" onClick={handleNavigate}>
            Enter Library
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default WelcomePage;
