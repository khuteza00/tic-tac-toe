import React from "react";
import "../App.css";
import logo from "../assest/tic-tac-toe-logo.png"

const StartScreen = ({ onStart }) => {
  return (
    <div className="start-screen">
      <img style={{borderRadius:"10px",marginTop:"-70px"}} src={logo} alt="Tic Tac Toe" className="logo" />
      <button className="start-button" onClick={onStart}>START</button>
    </div>
  );
};

export default StartScreen;
